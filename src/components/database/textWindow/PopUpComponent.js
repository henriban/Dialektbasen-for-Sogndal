import React from 'react';
import Symbols from '../../../data/symbols';

import '../../../styles/database/popUp.scss';

const removeREGEX = new RegExp("[.,]", "g");

class popUp extends React.Component {    
    constructor(props) {
        super(props);
        this.state = {
            word: this.props.word,
            btn1: "",
            btn2: "",
            btn3: "Anna",

            inf: this.props.inf,
            wordIndex: this.props.wordIndex,

            mouseX: this.props.mouseX, // So that more than one popUp can be showed
            mouseY: this.props.mouseY
        };
    }

    componentWillMount(){

        let symbol = this.props.symbol;

        let alternative1 = "";
        let alternative2 = "";

        if(symbol === Symbols.infinitiv_a || symbol === Symbols.infinitiv_e){
            alternative1 = "a";
            alternative2 = "e";
        }else if(symbol === Symbols.ao || symbol === Symbols.å){
            alternative1 = "ao";
            alternative2 = "å";
        }else if(symbol === Symbols.bundanForm_i || symbol === Symbols.bundanForm_a){
            alternative1 = "i";
            alternative2 = "a";
        }else if(symbol === Symbols.adnedn || symbol === Symbols.aneene){
            alternative1 = "adn/edn";
            alternative2 = "ane/ene";
        }else if(symbol === Symbols.dl || symbol === Symbols.ll){
            alternative1 = "dl";
            alternative2 = "ll";
        }else if(symbol === Symbols.dn || symbol === Symbols.rn){
            alternative1 = "dn";
            alternative2 = "rn";
        }

        let word = this.state.word;

        //trim word for "," and "."
        if(word.match(removeREGEX)){
            word = word.split(word.match(removeREGEX)[0])[0];
        }

        this.setState({
            word: word,
            btn1: alternative1,
            btn2: alternative2,
        });

        this.getActiveButtonFromLocalStorage()
    }

    getActiveButtonFromLocalStorage(){
        let symbol = JSON.parse(localStorage.getItem(this.state.inf))[this.props.wordIndex];

        if(symbol === this.state.btn1){
            return "btn1"
        }else if(symbol === this.state.btn2){
            return "btn2"
        }else if(symbol === "Anna"){
            return "btnA"
        }
    }

    buttonClicked(symbol){

        // To distinguish between the "Anna"
        if(symbol === "Anna"){
            symbol = symbol + "_" + this.state.btn1 + "_" + this.state.btn2;
        }

        this.props.onButtonClicked(symbol, this.state.inf);
    }

    render(){

        let activeButton = this.getActiveButtonFromLocalStorage();

        return (
            <div className="popUpWrapper" style={{left: this.state.mouseX, top: this.state.mouseY > 250 ? this.state.mouseY - 130 :this.state.mouseY + 10 }}>
                <button id="closePopUpIcon" onClick={() => this.props.onCloseClick()}>x</button>
                <p>{this.state.word}</p>
                <div className="popUpButtonContainer">
                    <button onClick={() => this.buttonClicked(this.state.btn1)} className={activeButton === ("btn1") ? "activeButton" : "defaultButton"}>{this.state.btn1}</button>
                    <button onClick={() => this.buttonClicked(this.state.btn2)} className={activeButton === ("btn2") ? "activeButton" : "defaultButton"}>{this.state.btn2}</button>
                </div>
                <button id="btnA" onClick={() => this.buttonClicked(this.state.btn3)} className={activeButton === ("btnA") ? "activeButton" : "defaultButton"}>{this.state.btn3}</button>
            </div>
        );
    }
}

export default popUp;