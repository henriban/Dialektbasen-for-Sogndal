import Informers from "../../data/informers";
const REGEX = new RegExp("([@#*¤%¨‘~+§{}])", "g");

// export default TestDataFromInformersText;
export const TestDataFromInformersText = ()=>{
    let graphData = {};
    for(let informant in Informers){

        let inf = Informers[informant];
        let id = inf.id;
        let data = [];
        let infNumber = "";

        inf.text.split("\n").map(line => {
                infNumber = findInformerNumber(line, infNumber, inf);

                line.split(" ").map(word => doWordContainSymbol(word) ?
                    id === infNumber ? data.push(getSymbol(word)) : null : null);

                return "";
            }
        );

        graphData[id] = generateSymbolCount(data);
    }

    return graphData;
};


    function generateSymbolCount(data){
        let symbolCount = {};
        data.map(symbol => symbolCount[symbol] ? symbolCount[symbol] += 1 :  symbolCount[symbol] = 1);
        return symbolCount;
    }

    function findInformerNumber(line, previousInfNumber, inf) {
        let split = inf.audio.split("inf_")[1].split("og");
        let id = inf.id;
        let id2 = split[1];
        if(line.split(":")[0] != null && line.split(":")[0].trim().split(" ").length === 1){
            return id.includes(line.split(":")[0].trim()) ? id : id2;
        }
        return previousInfNumber;
    }

    function doWordContainSymbol(word){
        return word.indexOf(word.match(REGEX)) !== -1;
    }

    function getSymbol(word){
        if(word !== null){
            return (word[word.indexOf(word.match(REGEX))]);
        }
    }

// generateDataFromInformersText(){
//     let graphData = {};
//     for(let informant in Informers){
//
//         let inf = Informers[informant];
//         let id = inf.id;
//         let data = [];
//         let infNumber = "";
//
//         inf.text.split("\n").map(line => {
//                 infNumber = this.findInformerNumber(line, infNumber, inf);
//
//                 line.split(" ").map(word => this.doWordContainSymbol(word) ?
//                     id === infNumber ? data.push(this.getSymbol(word)) : null : null);
//
//                 return "";
//             }
//         );
//
//         graphData[id] = this.generateSymbolCount(data);
//     }
//
//     console.log(graphData);
// }
//
// generateSymbolCount(data){
//     let symbolCount = {};
//     data.map(symbol => symbolCount[symbol] ? symbolCount[symbol] += 1 :  symbolCount[symbol] = 1);
//     return symbolCount;
// }
//
// findInformerNumber(line, previousInfNumber, inf) {
//     let split = inf.audio.split("inf_")[1].split("og");
//     let id = inf.id;
//     let id2 = split[1];
//     if(line.split(":")[0] != null && line.split(":")[0].trim().split(" ").length === 1){
//         return id.includes(line.split(":")[0].trim()) ? id : id2;
//     }
//     return previousInfNumber;
// }
//
// doWordContainSymbol(word){
//     return word.indexOf(word.match(REGEX)) !== -1;
// }
//
// getSymbol(word){
//     if(word !== null){
//         return (word[word.indexOf(word.match(REGEX))]);
//     }
// }