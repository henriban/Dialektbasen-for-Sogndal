import React from 'react';

import InformantInfoText from './InformantInfoTextComponent';
import Text from './Text';

import Informers from '../../../data/informers';
import '../../../styles/database/textWindow.scss';

let audioPlayer;
let isLocalStorageSet;
let needBuildWordList = false;

class Result extends React.Component {       

    constructor(props) {
        super(props);
        this.onCloseClick = this.onCloseClick.bind(this);

        let infToStore = Informers.find(x => x.id === this.props.inf).audio.split(".")[0];
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
            inf2: inf2,
            showDeleteLocalStorage: false
        };

        isLocalStorageSet = this.isInformersLocalStorageSet();

        if(!isLocalStorageSet){
            localStorage.setItem(this.state.inf1.id, JSON.stringify([]));
            localStorage.setItem(this.state.inf2.id, JSON.stringify([]));
            needBuildWordList = true;
        }
    }

    isInformersLocalStorageSet() {
        let localStorageInf1 = localStorage.getItem(this.state.inf1.id);
        let localStorageInf2 = localStorage.getItem(this.state.inf2.id);

        return localStorageInf1 != null && localStorageInf1.length > 0 
            && localStorageInf2 != null && localStorageInf2.length > 0;
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

    onDeleteClick(){
        this.setState({
            showDeleteLocalStorage: !this.state.showDeleteLocalStorage
        })
    }

    deleteAllLocalStorage(){
        console.log("All")
    }

    deleteInformersLocalStorage(){
        console.log("1")
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
        }else if (event.code === "ArrowRight"){
            audioPlayer.currentTime += 5;
        }else if (event.code === "ArrowLeft"){
            audioPlayer.currentTime -= 5;
        }
    };
    
    showSecondInformer(showSecondInf) {
        // if(showSecondInf){
            return <div className="secondInfPanel" onClick={() => this.onInfClick()}>
                <span><b>{this.state.inf2.id.split("p")[0]}: {this.state.inf2.age.split(" ")[0]} {this.state.inf2.gender.toLowerCase()} frå {this.state.inf2.place}</b></span>
                <InformantInfoText informant={this.state.inf2} showInformantInfo={this.state.showSecondInf}/>
            </div>
        // }else {
        //     return <span className="secondInfPanel" onClick={() => this.onInfClick()}><b>{this.state.inf2.id.split("p")[0]}: {this.state.inf2.age.split(" ")[0]} {this.state.inf2.gender.toLowerCase()} frå {this.state.inf2.place}</b></span>
        // }
    }

    render(){

        const url = require("../../../static/" + this.state.inf1.audio);

        return(
            <div className="resultBackground" >

                <div className="resultContainer" onMouseDown={this._onMouseMove.bind(this)}>

                    <div className="textWindowHeader">
                        <button className="closeButton" onClick={this.onCloseClick}><img src="./close.svg" alt="#"/></button>
                    </div>

                    <div className="textWindowContent">
                        <div className="informantInfoPanel">
                            <h2 id="headline">{this.state.inf1.age.split(" ")[0]} {this.state.inf1.gender.toLowerCase()} frå {this.state.inf1.place}</h2>
                            <InformantInfoText informant={this.state.inf1}/>

                            {this.state.inf2 != null ? this.showSecondInformer(this.state.showSecondInf) : null}
                        </div>

                        <div className="text">
                            <Text 
                                inf1={this.state.inf1}
                                inf2={this.state.inf2}
                                x={this.state.x}
                                y={this.state.y}
                                needBuildWordList={needBuildWordList}/>
                        </div>
                        {needBuildWordList = false}
                    </div>

                    <div className="textWindowFooter">
                        <audio id="audioPlayer"
                                src={url}
                                style={{width : 1000, margin: "auto", padding: 10}}
                                controls controlsList="nodownload"/>

                        { this.state.showDeleteLocalStorage && 
                            <div className="deleteLocalStorage">
                                <button onClick={() => this.deleteAllLocalStorage()}>Slett alle</button>
                                <button onClick={() => this.deleteInformersLocalStorage(this.state.inf1, this.state.inf2)}>Slett {this.state.inf1.id} og {this.state.inf2.id} </button>
                            </div>}
                        <button className="deleteButton" onClick={this.onDeleteClick.bind(this)}><img src="./delete.svg" alt="#"/></button>
                    </div>

                </div>
            </div>
        )
    }
}

export default Result;