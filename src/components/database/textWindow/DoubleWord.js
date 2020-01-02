import React from 'react';
import DoublePopUp from './DoubleWordPopUp';
import {GeneratePopUpBtnAlternatives} from "./GeneratePopUpBtnAlternatives";

const REGEX = new RegExp("([@#*¤%¨‘~+§{}])", "g");

class DoubleWord extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            word: this.trimWord(this.props.word),
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
    registerButtonClicked = () =>{
        this.closePopUp();
    };

    closePopUp(){
        this.setState({
            showPopUp: false
        });
    }

    divideWord(){
        let word = this.state.word;
        let str1 = word.substring(0, Math.round(word.length / 2));
        let str2 = word.substring(Math.round(word.length / 2), word.length);
        return [str1, str2]
    }

    getStyle(wordIndex){
        if(JSON.parse(localStorage.getItem(this.state.inf)) != null){
            let registeredSymbol = JSON.parse(localStorage.getItem(this.state.inf))[wordIndex];

            if(registeredSymbol !== ""){
                let alternatives = GeneratePopUpBtnAlternatives(registeredSymbol);

                if(registeredSymbol === alternatives.symbol1)
                    return { color: "blue" };
                else if(registeredSymbol === alternatives.symbol2)
                    return { color: "red" };
                else if(registeredSymbol === alternatives.anna)
                    return { color: "green" };
            }
        }

        return { color: "purple" };
    }

    //TODO: showPopUp globally (only on window at the time)
    render(){

        // let symbol = this.state.word.match(REGEX)[0];
        let symbol = this.state.symbol;
        let splitWord = this.divideWord();

        let style1 = this.getStyle(this.state.wordIndex - 1);
        let style2 = this.getStyle(this.state.wordIndex);

        return(
            <span>
                {this.state.showPopUp &&
                <DoublePopUp word={this.state.word}
                             symbol={symbol}
                             inf={this.state.inf}
                             wordIndex={this.state.wordIndex}

                             registerButtonClicked={this.registerButtonClicked}
                             onCloseClick={this.closePopUp.bind(this)}
                             mouseX={this.props.mouseX}
                             mouseY={this.props.mouseY}
                />}
                {/*OnClick find symbol and remove/trim word from symbol(ends up with symbol and word)*/}
                <span onClick={() => this.openPopUp()} key={this.id}>
                    <span style={style1}>{splitWord[0]}</span>
                    <span style={style2}>{splitWord[1]}</span> </span>
            </span>
        );
    }
}

export default DoubleWord;