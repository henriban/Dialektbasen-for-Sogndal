import React from 'react';

import Informers from '../../../data/informers';

import InformantInfoText from './InformantInfoTextComponent';
import DoubleWord from './DoubleWord';
import Word from './TextWindowWordComponent';

import '../../../styles/database/textWindow.scss';

const REGEX = new RegExp("([@#*¤%¨‘~+§{}])", "g");

let infToStore;
let isLocalStorageSet;
let needBuildWordList = false;
let clickableWordCountInf1;
let clickableWordCountInf2;

let audioPlayer;

class Result extends React.Component {       

    constructor(props) {
        super(props);
        this.onCloseClick = this.onCloseClick.bind(this);

        infToStore = Informers.find(x => x.id === this.props.inf).audio.split(".")[0];
        let splitInfToStore = infToStore.split("inf_")[1].split("og");
        let inf1 = Informers.find(inf => inf.id === splitInfToStore[0]);
        let inf2 = Informers.find(inf => inf.id === splitInfToStore[1]);

        if(inf1.id !== this.props.inf){
            let switchInf = inf1;
            inf1 = inf2;
            inf2 = switchInf;
        }

        this.state = {
            showSecondInf: false,
            x: 0,
            y: 0,
            inf1: inf1,
            inf2: inf2
        };

        isLocalStorageSet = this.isInformersLocalStorageSet();

        if(!isLocalStorageSet){
            localStorage.setItem(this.state.inf1.id, JSON.stringify([]));
            localStorage.setItem(this.state.inf2.id, JSON.stringify([]));
            needBuildWordList = true;
        }
    }

    componentWillMount(){
        document.addEventListener("keydown", this.onKeyPushed);
    }

    componentDidMount(){
        audioPlayer = document.getElementById("audioPlayer");
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.onKeyPushed);
    }

    onCloseClick(e){
        e.preventDefault();
        this.props.onCloseClick(0);
    }

    _onMouseMove(e) {
        this.setState({ x: e.clientX, y: e.clientY });
    }

    onInfClick(e){
        this.setState({ showSecondInf: !this.state.showSecondInf});
    }

    onKeyPushed  = (event) => {
        if(event.key === 'Escape'){
            this.onCloseClick(event);
        }else if (event.code === "Space"){
            event.preventDefault();
            audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause();
        }
    };

    // TODO: cannot read property id of undefined
    isInformersLocalStorageSet() {
        return localStorage.getItem(this.state.inf1.id) != null && localStorage.getItem(this.state.inf1.id).length > 0 &&
            localStorage.getItem(this.state.inf2.id) != null && localStorage.getItem(this.state.inf2.id).length > 0;
    }

    addWordInLocalStorage(infID){
        let wordList = JSON.parse(localStorage.getItem(infID));
        if(wordList != null){
            wordList.push("");
        }

        localStorage.setItem(infID, JSON.stringify(wordList));
    }

    generateText(){

        const text = this.state.inf1.text;

        let key = 0;
        clickableWordCountInf1 = 0;
        clickableWordCountInf2 = 0;

        let index = 0;
        let infNumber = "";

        return(
            // Splits the line on br and check if line contains a symbol.
            <div>{text.split("\n").map(line => {

                infNumber = this.findInformerNumber(line, infNumber);

                if(line.match(REGEX)) {
                    return <div key={key++}>{
                        line.split(" ")
                            .map(word => {
                                // if(word.indexOf(word.match(REGEX)) !== -1){

                                if(this.doWordContainTwoSymbol(word)){

                                    if(needBuildWordList){
                                        this.addWordInLocalStorage(infNumber);
                                        this.addWordInLocalStorage(infNumber);
                                    }

                                    index = this.state.inf1.id.includes(infNumber) ? clickableWordCountInf1 + 2: clickableWordCountInf2 + 2;

                                    return <DoubleWord key={key++}
                                                 wordIndex={index - 1}
                                                 word={word}

                                                 inf={infNumber}
                                                 mouseX={this.state.x}
                                                 mouseY={this.state.y}/>;

                                } else if(this.doWordContainSymbol(word)){

                                    if(needBuildWordList){
                                        this.addWordInLocalStorage(infNumber);
                                    }

                                    index = this.state.inf1.id.includes(infNumber) ? ++clickableWordCountInf1 : ++clickableWordCountInf2;

                                    return <Word key={key++}
                                                 wordIndex={index - 1}
                                                 word={word}

                                                 inf={infNumber}
                                                 mouseX={this.state.x}
                                                 mouseY={this.state.y}/>;
                                }else{
                                    return <span key={key++}>{word} </span>
                                }
                            })
                    }</div>
                } else {
                    return <div key={key++}>{line}</div>
                }
            })}
            </div>
        );
    }

    findInformerNumber(line, previousInfNumber) {

        let infNumberStr = line.split(":")[0].trim();

        if(infNumberStr != null && infNumberStr.split(" ").length === 1){
            if(Number(infNumberStr)){
                return this.state.inf1.id.includes(infNumberStr) ? this.state.inf1.id : this.state.inf2.id;
            }
        }
        return previousInfNumber;
    }

    doWordContainSymbol(word){
        return word.indexOf(word.match(REGEX)) !== -1;
    }

    doWordContainTwoSymbol(word){
        if(word.match(REGEX)){
            return word.match(REGEX).length === 2;
        }
        return false;
    }

    render(){

        const url = require("../../../static/" + this.state.inf1.audio);

        return(
            <div className="resultBackground" >

                <div className="resultContainer" onMouseDown={this._onMouseMove.bind(this)}>

                    <div className="textWindowHeader">
                        <button className="closeButton" onClick={this.onCloseClick}>x</button>
                    </div>

                    <div className="textWindowContent">
                        <div className="firstInfPanel">
                            <h2 id="headline">{this.state.inf1.age.split(" ")[0]} {this.state.inf1.gender.toLowerCase()} frå {this.state.inf1.place}</h2>
                            <InformantInfoText informant={this.state.inf1}/>

                            {this.state.inf2 != null ? this.showSecondInformer(this.state.showSecondInf) : null}

                        </div>

                        <div className="text">
                            {this.generateText()}
                            {needBuildWordList = false}
                        </div>
                    </div>

                    <audio id="audioPlayer"
                        src={url}
                        style={{width : 1000, margin: "auto", padding: 10}}
                        controls controlsList="nodownload"/>
                </div>
            </div>
        )
    }

    showSecondInformer(showSecondInf) {
        if(showSecondInf){
            return <div className="secondInfPanel" onClick={() => this.onInfClick()}>
                <span><b>{this.state.inf2.id.split("p")[0]}: {this.state.inf2.age.split(" ")[0]} {this.state.inf2.gender.toLowerCase()} frå {this.state.inf2.place}</b></span>
                <InformantInfoText informant={this.state.inf2}/>
            </div>
        }else {
            return <span className="secondInfPanel" onClick={() => this.onInfClick()}><b>{this.state.inf2.id.split("p")[0]}: {this.state.inf2.age.split(" ")[0]} {this.state.inf2.gender.toLowerCase()} frå {this.state.inf2.place}</b></span>
        }
    }
}

export default Result;