import React from 'react';
import PopUp from './PopUpComponent';
import {GeneratePopUpBtnAlternatives} from "./GeneratePopUpBtnAlternatives";

const REGEX = new RegExp("([@#*¤%¨‘~+§{}])", "g");

class Word extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            word: this.trimWord(this.props.word, this.props.word.match(REGEX)[0]),
            symbol: this.props.word.match(REGEX),
            inf: this.props.inf,
            wordIndex: this.props.wordIndex,

            showPopUp: false,
        };
    }

    openPopUp(){
        this.setState({
            showPopUp: !this.state.showPopUp,
        });
    }

    trimWord(word){
        return word.replace(REGEX, '');
    }

    // symbol = ao, e, a ...
    onButtonClicked = (symbol, inf) =>{

        if(inf !== "I") {

            // Register which button that is pressed
            let wordList = JSON.parse(localStorage.getItem(this.state.inf));
            wordList[this.state.wordIndex] = symbol;
            localStorage.setItem(this.state.inf, JSON.stringify(wordList));
        }

        this.closePopUp();
    };

    closePopUp(){
        this.setState({
            showPopUp: false
        });
    }
    
    getStyle(){
        if(JSON.parse(localStorage.getItem(this.state.inf)) != null){
            let registeredSymbol = JSON.parse(localStorage.getItem(this.state.inf))[this.state.wordIndex];

            if(registeredSymbol !== ""){
                let alternatives = GeneratePopUpBtnAlternatives(registeredSymbol);

                console.log("registered: ", registeredSymbol, "anna: ", alternatives.anna);

                if(registeredSymbol === alternatives.symbol1)
                    return { color: "blue" };
                else if(registeredSymbol === alternatives.symbol2)
                    return { color: "red" };
                else if(registeredSymbol === alternatives.anna)
                    return { color: "green" };
            }
        }

        return { color: "black" };
    }

    //TODO: showPopUp globally (only on window at the time)
    render(){

        // let symbol = this.state.word.match(REGEX)[0];
        let symbol = this.state.symbol;

        let style = this.getStyle();

        return(
            <span>
                {this.state.showPopUp &&
                <PopUp word={this.state.word}
                       symbol={symbol}
                       inf={this.state.inf}
                       wordIndex={this.state.wordIndex}

                       registerButtonClicked={this.onButtonClicked}
                       onCloseClick={this.closePopUp.bind(this)}
                       mouseX={this.props.mouseX}
                       mouseY={this.props.mouseY}
                />}
                {/*OnClick find symbol and remove/trim word from symbol(ends up with symbol and word)*/}
                <span onClick={() => this.openPopUp()}
                      style={style}
                      key={this.id}>{this.state.word} </span>
            </span>
        );
    }
}

export default Word;