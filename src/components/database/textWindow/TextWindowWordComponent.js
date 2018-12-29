import React from 'react';
import PopUp from './PopUpComponent';

const REGEX = new RegExp("([@#*¤%¨‘~+§{}])", "g");

let style = { 
  color: "blue"
};

class Word extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            word: this.trimWord(this.props.word, this.props.word.match(REGEX)[0]),
            symbol: this.props.word.match(REGEX)[0],
            inf: this.props.inf,
            wordIndex: this.props.wordIndex,
            infToStore: this.props.infToStore,

            showPopUp: false,
        };
    }

    openPopUp(){
        this.setState({
            showPopUp: !this.state.showPopUp,
        });
    }

    trimWord(word, symbol){
        if(word.split(symbol)[0] === ""){
            return word.split(symbol)[1];
        }

        return word.split(symbol)[0];
    }

    // symbol = ao, e, a ...
    onButtonClicked = (symbol, inf) =>{

        if(inf !== "I") {

            // Register which button that is pressed
            let wordList = JSON.parse(localStorage.getItem(this.state.infToStore));
            wordList[this.state.wordIndex] = symbol;
            localStorage.setItem(this.state.infToStore, JSON.stringify(wordList));
        }

        this.closePopUp();
    };

    closePopUp(){
        this.setState({
            showPopUp: false
        });
    }

    //TODO: showPopUp globally (only on window at the time)
    render(){

        // let symbol = this.state.word.match(REGEX)[0];
        let symbol = this.state.symbol;

        return(
            <span>
                {this.state.showPopUp &&
                <PopUp word={this.state.word}
                       symbol={symbol}
                       inf={this.state.inf}
                       infToStore={this.state.infToStore}
                       wordIndex={this.state.wordIndex}

                       onButtonClicked={this.onButtonClicked}
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