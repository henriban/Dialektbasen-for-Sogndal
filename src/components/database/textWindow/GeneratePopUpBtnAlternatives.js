import Symbols from "../../../data/symbols";
import Variables from "../../../data/variables";

export const GeneratePopUpBtnAlternatives = (symbol) => {

    let alternative1 = "";
    let alternative2 = "";
    let symbol1 = "";
    let symbol2 = "";
    let anna = "";

    if(symbol === Symbols.infinitiv_a || symbol === Symbols.infinitiv_e || symbol === Symbols.infinitiv_anna){
        alternative1 = Variables.infinitiv_a;
        alternative2 = Variables.infinitiv_e;
        symbol1 = Symbols.infinitiv_a;
        symbol2 = Symbols.infinitiv_e;
        anna = Symbols.infinitiv_anna;
    }else if(symbol === Symbols.ao || symbol === Symbols.å || symbol === Symbols.ao_anna){
        alternative1 = Variables.ao;
        alternative2 = Variables.å;
        symbol1 = Symbols.ao;
        symbol2 = Symbols.å;
        anna = Symbols.ao_anna;
    }else if(symbol === Symbols.bundanForm_i || symbol === Symbols.bundanForm_a || symbol === Symbols.bundanForm_anna){
        alternative1 = Variables.bundanForm_i;
        alternative2 = Variables.bundanForm_a;
        symbol1 = Symbols.bundanForm_i;
        symbol2 = Symbols.bundanForm_a;
        anna = Symbols.bundanForm_anna;
    }else if(symbol === Symbols.adnedn || symbol === Symbols.aneene || symbol === Symbols.adnedn_anna){
        alternative1 = Variables.adnedn;
        alternative2 = Variables.aneene;
        symbol1 = Symbols.adnedn;
        symbol2 = Symbols.aneene;
        anna = Symbols.adnedn_anna;
    }else if(symbol === Symbols.dl || symbol === Symbols.ll || symbol === Symbols.dl_anna){
        alternative1 = Variables.dl;
        alternative2 = Variables.ll;
        symbol1 = Symbols.dl;
        symbol2 = Symbols.ll;
        anna = Symbols.dl_anna;
    }else if(symbol === Symbols.dn || symbol === Symbols.rn || symbol === Symbols.dn_anna){
        alternative1 = Variables.dn;
        alternative2 = Variables.rn;
        symbol1 = Symbols.dn;
        symbol2 = Symbols.rn;
        anna = Symbols.dn_anna;
    }

    return { alternative1, alternative2, symbol1, symbol2, anna }
};