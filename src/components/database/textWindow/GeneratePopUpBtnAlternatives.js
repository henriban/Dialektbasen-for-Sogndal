import Symbols from "../../../data/symbols";

export const GeneratePopUpBtnAlternatives = (symbol) => {

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

    return { alternative1, alternative2}
};