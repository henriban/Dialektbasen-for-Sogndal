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
            alt1_symbol1: "",
            alt1_symbol2: "",
            alt1_symbol_anna: "",

            alt2_btn1: "",
            alt2_btn2: "",
            alt2_btn3: "Anna",
            alt2_symbol1: "",
            alt2_symbol2: "",
            alt2_symbol_anna: "",

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
            alt1_symbol1: alternatives1.symbol1,
            alt1_symbol2: alternatives1.symbol2,
            alt1_symbol_anna: alternatives1.anna,

            alt2_btn1: alternatives2.alternative1,
            alt2_btn2: alternatives2.alternative2,
            alt2_symbol1: alternatives2.symbol1,
            alt2_symbol2: alternatives2.symbol2,
            alt2_symbol_anna: alternatives2.anna,
        });

        this.getActiveButton1FromLocalStorage();
        this.getActiveButton2FromLocalStorage();
    }

    getActiveButton1FromLocalStorage(){
        let symbol = JSON.parse(localStorage.getItem(this.state.inf))[this.props.wordIndex - 1];

        if(symbol === this.state.alt1_symbol1){
            return "alt1_btn1"
        }else if(symbol === this.state.alt1_symbol2){
            return "alt1_btn2"
        }else if(symbol === this.state.alt1_symbol_anna){
            return "btnA1"
        }
    }

    getActiveButton2FromLocalStorage(){
        let symbol = JSON.parse(localStorage.getItem(this.state.inf))[this.props.wordIndex];

        if(symbol === this.state.alt2_symbol1){
            return "alt2_btn1"
        }else if(symbol === this.state.alt2_symbol2){
            return "alt2_btn2"
        }else if(symbol === this.state.alt2_symbol_anna){
            return "btnA2"
        }
    }


    buttonClicked(symbol, wordIndex){

        // Register which button that is pressed
        let wordList = JSON.parse(localStorage.getItem(this.state.inf));
        wordList[wordIndex] = symbol;
        localStorage.setItem(this.state.inf, JSON.stringify(wordList));

        this.props.registerButtonClicked(symbol, this.state.inf);
    }

    render(){

        let activeButton1 = this.getActiveButton1FromLocalStorage();
        let activeButton2 = this.getActiveButton2FromLocalStorage();

        // Making sure the popup spawn within the text area
        let spawnPosition = {
            left: this.state.mouseX + 230 > window.innerWidth ? this.state.mouseX - 230 : this.state.mouseX,
            top: this.state.mouseY > 250 ? this.state.mouseY - 130 :this.state.mouseY + 10
        }

        return (
            <div className="popUpWrapper" style={spawnPosition}>
                <button id="closePopUpIcon" onClick={() => this.props.onCloseClick()}><img src="./close.svg" alt="#" width="10"/></button>
                <p>{this.state.word}</p>
                <div className="popUpButtonContainer">
                    <button onClick={() => this.buttonClicked(this.state.alt1_symbol1, this.state.wordIndex - 1)} className={activeButton1 === ("alt1_btn1") ? "activeButton" : "defaultButton"}>{this.state.alt1_btn1}</button>
                    <button onClick={() => this.buttonClicked(this.state.alt1_symbol2, this.state.wordIndex - 1)} className={activeButton1 === ("alt1_btn2") ? "activeButton" : "defaultButton"}>{this.state.alt1_btn2}</button>
                    <button onClick={() => this.buttonClicked(this.state.alt1_symbol_anna, this.state.wordIndex - 1)} className={activeButton1 === ("btnA1") ? "activeButton" : "defaultButton"}>{this.state.alt1_btn3}</button>
                </div>
                <div className="popUpButtonContainer">
                    <button onClick={() => this.buttonClicked(this.state.alt2_symbol1, this.state.wordIndex)} className={activeButton2 === ("alt2_btn1") ? "activeButton" : "defaultButton"}>{this.state.alt2_btn1}</button>
                    <button onClick={() => this.buttonClicked(this.state.alt2_symbol2, this.state.wordIndex)} className={activeButton2 === ("alt2_btn2") ? "activeButton" : "defaultButton"}>{this.state.alt2_btn2}</button>
                    <button onClick={() => this.buttonClicked(this.state.alt2_symbol_anna, this.state.wordIndex)} className={activeButton2 === ("btnA2") ? "activeButton" : "defaultButton"}>{this.state.alt2_btn3}</button>
                </div>
            </div>
        );
    }
}

export default DoubleWordPopUp;