import Symbols from "../../../data/symbols";
import Variables from "../../../data/variables";

export const GeneratePopUpBtnAlternatives = (symbol) => {

    let alternative1 = "";
    let alternative2 = "";

    if(symbol === Symbols.infinitiv_a || symbol === Symbols.infinitiv_e){
        alternative1 = Variables.infinitiv_a;
        alternative2 = Variables.infinitiv_e;
    }else if(symbol === Symbols.ao || symbol === Symbols.å){
        alternative1 = Variables.ao;
        alternative2 = Variables.å;
    }else if(symbol === Symbols.bundanForm_i || symbol === Symbols.bundanForm_a){
        alternative1 = Variables.bundanForm_i;
        alternative2 = Variables.bundanForm_a;
    }else if(symbol === Symbols.adnedn || symbol === Symbols.aneene){
        alternative1 = Variables.adnedn;
        alternative2 = Variables.aneene;
    }else if(symbol === Symbols.dl || symbol === Symbols.ll){
        alternative1 = Variables.dl;
        alternative2 = Variables.ll;
    }else if(symbol === Symbols.dn || symbol === Symbols.rn){
        alternative1 = Variables.dn;
        alternative2 = Variables.rn;
    }

    return { alternative1, alternative2}
};