import React from 'react';
import DoublePopUp from './DoubleWordPopUp';

const REGEX = new RegExp("([@#*¤%¨‘~+§{}])", "g");

let style = {
    color: "red"
};

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

    //TODO: showPopUp globally (only on window at the time)
    render(){

        // let symbol = this.state.word.match(REGEX)[0];
        let symbol = this.state.symbol;

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
                <span onClick={() => this.openPopUp()}
                      style={style}
                      key={this.id}>{this.state.word} </span>
            </span>
        );
    }
}

export default DoubleWord;