import React from 'react';
import DoubleWord from './DoubleWord';
import Word from './Word';

const REGEX = new RegExp("([@#*¤%¨‘~+§{}])", "g");

let clickableWordCountInf1;
let clickableWordCountInf2;

class Text extends React.Component{

    addWordInLocalStorage(infID){
        let wordList = JSON.parse(localStorage.getItem(infID));
        if(wordList != null){
            wordList.push("");
        }

        localStorage.setItem(infID, JSON.stringify(wordList));
    }

    findInformerNumber(line, previousInfNumber) {

        let infNumberStr = line.split(":")[0].trim();

        if(infNumberStr != null && infNumberStr.split(" ").length === 1){
            if(Number(infNumberStr)){
                return this.props.inf1.id.includes(infNumberStr) ? this.props.inf1.id : this.props.inf2.id;
            }
        }
        return previousInfNumber;
    }

    doWordContainSymbol(word){
        return word.indexOf(word.match(REGEX)) !== -1;
    }

    doWordContainTwoSymbol(word){
        if(word.match(REGEX)){
            return word.match(REGEX).length === 2;
        }
        return false;
    }

    render(){

        const text = this.props.inf1.text;

        let key = 0;
        clickableWordCountInf1 = 0;
        clickableWordCountInf2 = 0;

        let index = 0;
        let infNumber = "";

        let needBuildWordList = localStorage.getItem(this.props.inf1.id) !== null ? this.props.needBuildWordList : true;

        return(
            // Splits the line on br and check if line contains a symbol.
            <div className="text">{text.split("\n").map(line => {

                infNumber = this.findInformerNumber(line, infNumber);

                if(line.match(REGEX)) {
                    return <div key={key++}>{
                        line.split(" ")
                            .map(word => {

                                if(this.doWordContainTwoSymbol(word)){

                                    if(needBuildWordList){
                                        this.addWordInLocalStorage(infNumber);
                                        this.addWordInLocalStorage(infNumber);
                                    }

                                    index = this.props.inf1.id.includes(infNumber) ? clickableWordCountInf1 += 2: clickableWordCountInf2 += 2;

                                    return <DoubleWord key={key++}
                                                 wordIndex={index - 1}
                                                 word={word}

                                                 inf={infNumber}
                                                 mouseX={this.props.x}
                                                 mouseY={this.props.y}/>;

                                } else if(this.doWordContainSymbol(word)){

                                    if(needBuildWordList){
                                        this.addWordInLocalStorage(infNumber);
                                    }

                                    index = this.props.inf1.id.includes(infNumber) ? ++clickableWordCountInf1 : ++clickableWordCountInf2;

                                    return <Word key={key++}
                                                 wordIndex={index - 1}
                                                 word={word}

                                                 inf={infNumber}
                                                 mouseX={this.props.x}
                                                 mouseY={this.props.y}/>;
                                }else{
                                    return <span key={key++}>{word} </span>
                                }
                            })
                    }</div>
                } else {
                    return <div key={key++}>{line}</div>
                }
            })}
            </div>
        );
    }

}

export default Text;