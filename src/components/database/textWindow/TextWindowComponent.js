import React from 'react';

import InformantInfoPanel from './InformantInfoPanel';
import Text from './Text';
import DeleteLocalStorage from './DeleteLocalStorage';

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
        };

        isLocalStorageSet = this.isInformersLocalStorageSet();

        if(!isLocalStorageSet){
            localStorage.setItem(this.state.inf1.id, JSON.stringify([]));
            
            if(this.state.inf2 !== undefined)
            localStorage.setItem(this.state.inf2.id, JSON.stringify([]));

            needBuildWordList = true;
        }
    }

    isInformersLocalStorageSet() {
        let localStorageInf1 = localStorage.getItem(this.state.inf1.id);

        if(this.state.inf2 === undefined){
            return localStorageInf1 != null && localStorageInf1.length > 0 
        }

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

    _onMouseMove(e) {
        this.setState({ x: e.clientX, y: e.clientY });
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
    
    render(){

        const url = require("../../../static/" + this.state.inf1.audio);

        return(
            <div className="textWindowBackground" >

                <div className="textWindowWrapper" onMouseDown={this._onMouseMove.bind(this)}>

                    <div className="textWindowHeader">
                        <button className="closeButton" onClick={this.onCloseClick}><img src="./close.svg" alt="#"/></button>
                    </div>

                    <div className="textWindowContent">
                        <InformantInfoPanel 
                            inf1={this.state.inf1}
                            inf2={this.state.inf2}/>

                        <Text 
                            inf1={this.state.inf1}
                            inf2={this.state.inf2}
                            x={this.state.x}
                            y={this.state.y}
                            needBuildWordList={needBuildWordList}/>
                        
                        {needBuildWordList = false}
                    </div>

                    <div className="textWindowFooter">
                        <audio  id="audioPlayer"
                                src={url}
                                controls controlsList="nodownload"/>

                        <DeleteLocalStorage 
                            inf1={this.state.inf1} 
                            inf2={this.state.inf2}/>
                    </div>

                </div>
            </div>
        )
    }
}

export default Result;