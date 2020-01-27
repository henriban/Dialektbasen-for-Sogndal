import React from 'react';
import '../../../styles/database/popUp.scss';
import {GeneratePopUpBtnAlternatives} from "./GeneratePopUpBtnAlternatives";

const removeREGEX = new RegExp("[.,]", "g");

class popUp extends React.Component {    
    constructor(props) {
        super(props);
        this.state = {
            word: this.props.word,
            btn1: "",
            btn2: "",
            btn3: "Anna",
            btn1_symbol1: "",
            btn2_symbol2: "",
            btn3_symbol_anna: "",

            inf: this.props.inf,
            wordIndex: this.props.wordIndex,

            mouseX: this.props.mouseX, // So that more than one popUp can be showed
            mouseY: this.props.mouseY
        };
    }

    componentWillMount(){

        let symbol = this.props.symbol[0];

        let alternatives = GeneratePopUpBtnAlternatives(symbol);

        let word = this.state.word;

        //trim word for "," and "."
        if(word.match(removeREGEX)){
            word = word.replace(removeREGEX, '');
        }

        this.setState({
            word: word,
            btn1: alternatives.alternative1,
            btn2: alternatives.alternative2,
            btn1_symbol1: alternatives.symbol1,
            btn2_symbol2: alternatives.symbol2,
            btn3_symbol_anna: alternatives.anna,
        });

        this.getActiveButtonFromLocalStorage()
    }

    getActiveButtonFromLocalStorage(){
        
        let symbol = JSON.parse(localStorage.getItem(this.state.inf))[this.props.wordIndex];

        if(symbol === this.state.btn1_symbol1){
            return "btn1"
        }else if(symbol === this.state.btn2_symbol2){
            return "btn2"
        }else if(symbol === this.state.btn3_symbol_anna){
            return "btnA"
        }
    }

    buttonClicked(symbol){
        this.props.registerButtonClicked(symbol, this.state.inf);
    }

    getFocusButton(activeButton, buttonString){
        return activeButton === buttonString ? "activeButton" : "defaultButton"
    }

    render(){

        let activeButton = this.getActiveButtonFromLocalStorage();

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
                    <button onClick={() => this.buttonClicked(this.state.btn1_symbol1)} className={this.getFocusButton(activeButton, "btn1")}>{this.state.btn1}</button>
                    <button onClick={() => this.buttonClicked(this.state.btn2_symbol2)} className={this.getFocusButton(activeButton, "btn2")}>{this.state.btn2}</button>
                </div>
                <button id="btnA" onClick={() => this.buttonClicked(this.state.btn3_symbol_anna)} className={this.getFocusButton(activeButton,"btnA")}>{this.state.btn3}</button>
            </div>
        );
    }
}

export default popUp;