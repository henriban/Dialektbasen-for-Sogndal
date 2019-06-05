import React from 'react';
import {GeneratePopUpBtnAlternatives} from "./GeneratePopUpBtnAlternatives";

import '../../../styles/database/popUp.scss';

const removeREGEX = new RegExp("[.,]", "g");

class DoubleWordPopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            word: this.props.word,
            alt1_btn1: "",
            alt1_btn2: "",
            alt1_btn3: "Anna",

            alt2_btn1: "",
            alt2_btn2: "",
            alt2_btn3: "Anna",

            inf: this.props.inf,
            wordIndex: this.props.wordIndex,

            mouseX: this.props.mouseX, // So that more than one popUp can be showed
            mouseY: this.props.mouseY
        };
    }

    componentWillMount(){

        let symbol = this.props.symbol;

        let alternatives1 = GeneratePopUpBtnAlternatives(symbol[0]);
        let alternatives2 = GeneratePopUpBtnAlternatives(symbol[1]);

        let word = this.state.word;

        //trim word for "," and "."
        if(word.match(removeREGEX)){
            word = word.split(word.match(removeREGEX)[0])[0];
        }

        this.setState({
            word: word,
            alt1_btn1: alternatives1.alternative1,
            alt1_btn2: alternatives1.alternative2,

            alt2_btn1: alternatives2.alternative1,
            alt2_btn2: alternatives2.alternative2,
        });

        this.getActiveButton1FromLocalStorage();
        this.getActiveButton2FromLocalStorage();
    }

    getActiveButton1FromLocalStorage(){
        let symbol = JSON.parse(localStorage.getItem(this.state.inf))[this.props.wordIndex - 1];

        if(symbol === this.state.alt1_btn1){
            return "alt1_btn1"
        }else if(symbol === this.state.alt1_btn2){
            return "alt1_btn2"
        }else if(symbol === "Anna"){
            return "btnA1"
        }
    }

    getActiveButton2FromLocalStorage(){
        let symbol = JSON.parse(localStorage.getItem(this.state.inf))[this.props.wordIndex];

        if(symbol === this.state.alt2_btn1){
            return "alt2_btn1"
        }else if(symbol === this.state.alt2_btn2){
            return "alt2_btn2"
        }else if(symbol === "Anna"){
            return "btnA2"
        }
    }


    buttonClicked(symbol, wordIndex){

        // Register which button that is pressed
        let wordList = JSON.parse(localStorage.getItem(this.state.inf));
        wordList[wordIndex] = symbol;
        localStorage.setItem(this.state.inf, JSON.stringify(wordList));

        // To distinguish between the "Anna"
        if(symbol === "Anna"){
            symbol = symbol + "_" + this.state.alt1_btn1 + "_" + this.state.alt1_btn2;
        }

        this.props.registerButtonClicked(symbol, this.state.inf);
    }

    render(){

        let activeButton1 = this.getActiveButton1FromLocalStorage();
        let activeButton2 = this.getActiveButton2FromLocalStorage();

        return (
            <div className="popUpWrapper" style={{left: this.state.mouseX, top: this.state.mouseY > 250 ? this.state.mouseY - 130 :this.state.mouseY + 10 }}>
                <button id="closePopUpIcon" onClick={() => this.props.onCloseClick()}>x</button>
                <p>{this.state.word}</p>
                <div className="popUpButtonContainer">
                    <button onClick={() => this.buttonClicked(this.state.alt1_btn1, this.state.wordIndex - 1)} className={activeButton1 === ("alt1_btn1") ? "activeButton" : "defaultButton"}>{this.state.alt1_btn1}</button>
                    <button onClick={() => this.buttonClicked(this.state.alt1_btn2, this.state.wordIndex - 1)} className={activeButton1 === ("alt1_btn2") ? "activeButton" : "defaultButton"}>{this.state.alt1_btn2}</button>
                    <button onClick={() => this.buttonClicked(this.state.alt1_btn3, this.state.wordIndex - 1)} className={activeButton1 === ("btnA1") ? "activeButton" : "defaultButton"}>{this.state.alt1_btn3}</button>
                </div>
                <div className="popUpButtonContainer">
                    <button onClick={() => this.buttonClicked(this.state.alt2_btn1, this.state.wordIndex)} className={activeButton2 === ("alt2_btn1") ? "activeButton" : "defaultButton"}>{this.state.alt2_btn1}</button>
                    <button onClick={() => this.buttonClicked(this.state.alt2_btn2, this.state.wordIndex)} className={activeButton2 === ("alt2_btn2") ? "activeButton" : "defaultButton"}>{this.state.alt2_btn2}</button>
                    <button onClick={() => this.buttonClicked(this.state.alt2_btn3, this.state.wordIndex)} className={activeButton2 === ("btnA2") ? "activeButton" : "defaultButton"}>{this.state.alt2_btn3}</button>
                </div>
            </div>
        );
    }
}

export default DoubleWordPopUp;