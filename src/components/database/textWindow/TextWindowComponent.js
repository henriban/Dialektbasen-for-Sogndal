import React from 'react';

import Informers from '../../../data/informers';

import InformantInfoText from './InformantInfoTextComponent';
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
        let inf1 = splitInfToStore[0];
        let inf2 = splitInfToStore[1];


        this.state = {
            showSecondInf: false,
            x: 0,
            y: 0,
            inf1: inf1,
            inf2: inf2
        };

        isLocalStorageSet = this.isInformersLocalStorageSet();

        if(!isLocalStorageSet){
            localStorage.setItem(this.state.inf1, JSON.stringify([]));
            localStorage.setItem(this.state.inf2, JSON.stringify([]));
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

    isInformersLocalStorageSet() {
        return localStorage.getItem(this.state.inf1) != null && localStorage.getItem(this.state.inf1).length > 0 &&
            localStorage.getItem(this.state.inf2) != null && localStorage.getItem(this.state.inf2).length > 0;
    }

    addWordInLocalStorage(infID){
        let wordList = JSON.parse(localStorage.getItem(infID));
        wordList.push("");
        localStorage.setItem(infID, JSON.stringify(wordList));
    }

    generateText(){

        const id = this.props.inf;

        let inf1 = Informers.find(inf => inf.id === id);
        const text = inf1.text;

        let key = 0;
        clickableWordCountInf1 = 0;
        clickableWordCountInf2 = 0;

        let index = 0;

        let infNumber = "";


        return(
            // Splits the line on br and check if line contains a symbol.
            <div>{text.split("\n").map(line => {
                if(line.match(REGEX)) {

                    // Find the informant number to the line or use the last registered inf id
                    if(line.split(":")[0] != null && line.split(":")[0].trim().split(" ").length === 1){
                        infNumber = line.split(":")[0].trim();
                        infNumber = this.state.inf1.includes(infNumber) ? this.state.inf1 : this.state.inf2;
                    }

                    return <div key={key++}>{
                        line.split(" ")
                            .map(word => {
                                if(word.indexOf(word.match(REGEX)) !== -1){

                                    if(needBuildWordList){
                                        this.addWordInLocalStorage(infNumber);
                                    }

                                    index = this.state.inf1.includes(infNumber) ? ++clickableWordCountInf1 : ++clickableWordCountInf2;

                                    return <Word key={key++}
                                                 wordIndex={index - 1}
                                                 word={word}
                                                 infToStore={infNumber}

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

    render(){
        // const {x, y} = this.state;
        const id = this.props.inf;

        let inf1 = Informers.find(x => x.id === id);

        // const text = inf1.text;

        const url = require("../../../static/" + inf1.audio);

        let idString = inf1.audio.split("_")[1].split("og");
        let id2 = "";
        if(id === idString[0]) {
            id2 = idString[1].split(".")[0];
        }else{
            id2 = idString[0];
        }

        let inf2 = Informers.find(x => x.id === id2);

        return(
            <div className="resultBackground" >

                <div className="resultContainer" onMouseDown={this._onMouseMove.bind(this)}>
                    {/*<h1>Mouse coordinates: \n { x } { y }</h1>*/}
                    <div className="textWindowHeader">
                        <button className="closeButton" onClick={this.onCloseClick} href='#'>x</button>
                    </div>

                    <div className="textWindowContent">
                        <div className="firstInfPanel">
                            <h2 id="headline">{inf1.age.split(" ")[0]} {inf1.gender.toLowerCase()} frå {inf1.place}</h2>
                            <InformantInfoText informant={inf1}/>

                            {
                                !this.state.showSecondInf &&
                                <span className="secondInfPanel" onClick={() => this.onInfClick()}><b>{inf2.id.split("p")[0]}: {inf2.age.split(" ")[0]} {inf2.gender.toLowerCase()} frå {inf2.place}</b></span>
                            }
                            {
                                this.state.showSecondInf &&
                                <div className="secondInfPanel" onClick={() => this.onInfClick()}>
                                    <span><b>{inf2.id.split("p")[0]}: {inf2.age.split(" ")[0]} {inf2.gender.toLowerCase()} frå {inf2.place}</b></span>
                                    <InformantInfoText informant={inf2}/>
                                </div>
                            }
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
}

export default Result;