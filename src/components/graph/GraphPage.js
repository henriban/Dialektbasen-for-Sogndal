import React from 'react';

import Graph from './GraphComponent';
import GraphSearch from './GraphSearchComponent';
import RadioButtons  from './RadioButtonComponent';

import { TestDataFromInformersText }from './TestDataFromInformersText';

import Informers from "../../data/informers";
import SearchVariables from "../../data/searchVariables";
import Symbols from "../../data/symbols";
// import GraphTraitsSelection from './graphTraitsSelectionComponent';

import '../../styles/graph/graph.scss';

let informersData = {};
// const REGEX = new RegExp("([@#*¤%¨‘~+§{}])", "g");

class GraphPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            filters: [],
            filteredInformers: this.getAllInformers(),

            tickFormat: [], // labels for Victory Axis
            tickValues: [], // number of different labels ex: [1,2,3]

            dataGraph1: [],
            dataGraph2: [],
            dataGraph3: [],
            dataGraph4: [],
            dataGraph5: [],
            dataGraph6: [],

            filteredTestDataFromInformersText: [],
            searchLabel: null,
            filteredDemoInf: [],
            filteredInformersDividedOnSearchLabel: {}
        };
    }

    componentDidMount(){
        this.generateDataFromLocalStorage();
    }

    setFilter(filters){
        this.setState({
            filters: filters,
            filteredInformers: this.getFilteredInformers(filters)
        }, () => {this.update()});
    }

    update(){
        if(this.state.searchLabel != null){
            this.setSearchLabels(this.state.searchLabel);
        }
    }

    getFilteredInformers(filters){

        return this.getAllInformers()
            .filter(inf => filters.place.length > 0 ? filters.place.includes(inf.place) : inf)
            .filter(inf => filters.gender.length > 0 ? filters.gender.includes(inf.gender) : inf)
            .filter(inf => filters.age.length > 0 ? filters.age.includes(inf.age) : inf)
            .filter(inf => filters.birth.length > 0 ? filters.birth.includes(inf.birth) : inf)
            .filter(inf => filters.date_of_recording.length > 0 ? filters.date_of_recording.includes(inf.date_of_recording) : inf)
            .filter(inf => filters.education.length > 0 ? filters.education.includes(inf.education) : inf)
            .filter(inf => filters.occupation.length > 0 ? filters.occupation.includes(inf.occupation) : inf)
            .filter(inf => filters.parents_background.length > 0 ? filters.parents_background.includes(inf.parents_background) : inf)
            .filter(inf => filters.panel.length > 0 ? filters.panel.includes(inf.panel) : inf);
    }

    getAllInformers(){
        let informers = [];
        Informers.map(inf =>
            informers.push({
                id: inf.id,
                place: inf.place.trim(),
                gender: inf.gender.trim(),
                age: inf.age.trim(),
                birth: inf.birth.trim(),
                date_of_recording: inf.date_of_recording.trim(),
                education: inf.education.trim(),
                occupation: inf.occupation.trim(),
                parents_background: inf.parents_background.trim(),
                panel: inf.panel.trim()
            })
        );

        return informers;
    }

    generateDataFromLocalStorage(){

        Informers.forEach(function (inf) {
            let infData = JSON.parse(localStorage.getItem(inf.id));

            console.log(inf.id, infData);
            return;

            if (infData != null) {
                let counts = {};
                for (let i = 0; i < infData.length; i++) {
                    let data = infData[i];
                    if (data.trim() !== "") {
                        counts[infData[i]] = 1 + (counts[infData[i]] || 0);
                    }
                }
                informersData[inf.id] = counts;
            }
        });
    }

    setSearchLabels(searchLabel){

        let filteredInformersDividedOnSearchLabel = {};

        SearchVariables[searchLabel].map(item => filteredInformersDividedOnSearchLabel[item.label] = []);
        this.state.filteredInformers.map(inf => filteredInformersDividedOnSearchLabel[inf[searchLabel]] = filteredInformersDividedOnSearchLabel[inf[searchLabel]].concat(inf));

        let tickFormat = [];
        let tickValues = [];
        let index = 0;

        SearchVariables[searchLabel].map(item => tickFormat.push(item.label));
        tickFormat.map(tick => tickValues.push(++index));

        this.setState({
            tickFormat: tickFormat,
            tickValues: tickValues
        });


        this.setState({
            searchLabel: searchLabel,
            // filteredInformersDividedOnSearchLabel: filteredInformersDividedOnSearchLabel
        });

        // this.filterDemo();


        this.generateSymbolCountPerLabel(searchLabel, filteredInformersDividedOnSearchLabel);

        this.generateData(tickValues.length);
    }

    generateSymbolCountPerLabel(searchLabel, filteredInformers){
        let d = {};
        let searchLabels = [];

        SearchVariables[searchLabel].map(item => d[item.label] = {});
        SearchVariables[searchLabel].map(item => searchLabels.push(item.label));

        for(let key in filteredInformers){
            if(filteredInformers.hasOwnProperty(key)){
                let symbols = [];
                filteredInformers[key].map(inf => symbols.push(this.getSymbolCountFromInformer(inf)));
                d[key] = symbols;
            }
        }
        this.mergeSymbolCount(d);
    }

    mergeSymbolCount(d){
        let symbolDictionary = {};

        for(let key in d){
            if(d.hasOwnProperty(key)){
                let symbolMerge = {};
                d[key].map(symbols => {
                    for(let s in symbols){
                        if(symbols.hasOwnProperty(s)){

                            if(!(s in symbolMerge)){
                                symbolMerge[s] = 0;
                            }

                            symbolMerge[s] += parseInt(symbols[s]);
                        }
                    }
                });
                symbolDictionary[key] = symbolMerge;
            }
        }

        this.splitDataBetweenGraphs(symbolDictionary);
    }

    returnZeroIfUndefined(number){
        return number !== undefined ? number : 0;
    }

    splitDataBetweenGraphs(symbolDictionary){

        let data1 = [];
        let data2 = [];
        let data3 = [];
        let data4 = [];
        let data5 = [];
        let data6 = [];

        for(let key in symbolDictionary){
            if(symbolDictionary.hasOwnProperty(key)) {
                let symbols = symbolDictionary[key];
                // data1.push([{x: 1, y: this.returnZeroIfUndefined(symbols[Symbols.infinitiv_a])},    {x: 2, y: this.returnZeroIfUndefined(symbols[Symbols.infinitiv_e])}, {x: 3, y: 0}]);
                // data2.push([{x: 1, y: this.returnZeroIfUndefined(symbols[Symbols.ao])},             {x: 2, y: this.returnZeroIfUndefined(symbols[Symbols.å])}, {x: 3, y: 0}]);
                // data3.push([{x: 1, y: this.returnZeroIfUndefined(symbols[Symbols.bundanForm_i])},   {x: 2, y: this.returnZeroIfUndefined(symbols[Symbols.bundanForm_a])}, {x: 3, y: 0}]);
                // data4.push([{x: 1, y: this.returnZeroIfUndefined(symbols[Symbols.adnedn])},         {x: 2, y: this.returnZeroIfUndefined(symbols[Symbols.aneene])}, {x: 3, y: 0}]);
                // data5.push([{x: 1, y: this.returnZeroIfUndefined(symbols[Symbols.dl])},             {x: 2, y: this.returnZeroIfUndefined(symbols[Symbols.ll])}, {x: 3, y: 0}]);
                // data6.push([{x: 1, y: this.returnZeroIfUndefined(symbols[Symbols.dn])},             {x: 2, y: this.returnZeroIfUndefined(symbols[Symbols.rn])}, {x: 3, y: 0}]);
                data1.push([this.returnZeroIfUndefined(symbols[Symbols.infinitiv_a]),    this.returnZeroIfUndefined(symbols[Symbols.infinitiv_e]),  0]);
                data2.push([this.returnZeroIfUndefined(symbols[Symbols.ao]),             this.returnZeroIfUndefined(symbols[Symbols.å]),            0]);
                data3.push([this.returnZeroIfUndefined(symbols[Symbols.bundanForm_i]),   this.returnZeroIfUndefined(symbols[Symbols.bundanForm_a]), 0]);
                data4.push([this.returnZeroIfUndefined(symbols[Symbols.adnedn]),         this.returnZeroIfUndefined(symbols[Symbols.aneene]),       0]);
                data5.push([this.returnZeroIfUndefined(symbols[Symbols.dl]),             this.returnZeroIfUndefined(symbols[Symbols.ll]),           0]);
                data6.push([this.returnZeroIfUndefined(symbols[Symbols.dn]),             this.returnZeroIfUndefined(symbols[Symbols.rn]),           0]);
            }
        }

        this.setState({
            dataGraph1: this.mergeSymbolValues(data1),
            dataGraph2: this.mergeSymbolValues(data2),
            dataGraph3: this.mergeSymbolValues(data3),
            dataGraph4: this.mergeSymbolValues(data4),
            dataGraph5: this.mergeSymbolValues(data5),
            dataGraph6: this.mergeSymbolValues(data6),
        });
    }


    mergeSymbolValues(data){

        let dataSet = [];

        for(let i = 0; i < 3; i++){
            let d = [];
            for(let j = 0; j < data.length; j++){
                d.push({x: j + 1, y: data[j][i]});
            }
            dataSet.push(d);
        }

        return dataSet;
    }

    getSymbolCountFromInformer(inf){
        for(let id in this.state.filteredTestDataFromInformersText){
            if(id === inf.id){
                return this.state.filteredTestDataFromInformersText[id];
            }
        }
    }

    generateData(tick){
        let data = [];

        for(let i = 0; i < 3; i++){
            let innerArray = [];
            for(let j = 1; j < tick + 1; j++){
                innerArray.push({x: j, y: Math.floor(Math.random() * Math.floor(9)) + 1});
            }

            data.push(innerArray)
        }

        // this.setState({
        //     dataGraph1: data,
        //     dataGraph2: data,
        //     dataGraph3: data,
        //     dataGraph4: data,
        //     dataGraph5: data,
        //     dataGraph6: data,
        // });
    }


    testFilteredInformers(){

        let filteredInformersId = [];
        this.state.filteredInformers.map(inf => filteredInformersId.push(inf.id));

        let allInformersId = [];
        this.getAllInformers().map(inf => allInformersId.push(inf.id));

        console.log("Not include", allInformersId.filter(n => !filteredInformersId.includes(n)));
    }

    demoButtonClicked(){
        this.setState({
            filteredTestDataFromInformersText: TestDataFromInformersText()
        });

        this.update();
    }

    render(){

        // this.testFilteredInformers();
        // this.generateDataFromInformersText();

        return(
            <div>
                <button onClick={() => this.demoButtonClicked()}>DEMO</button>
                <RadioButtons setSearchLabels={this.setSearchLabels.bind(this)}/>
                <GraphSearch setFilter={this.setFilter.bind(this)}/>

                <div className="graphPage">
                    <Graph tickFormat={this.state.tickFormat} tickValues={this.state.tickValues} data={this.state.dataGraph1} explanation1="a"  explanation2="e" title="Infinitiv"/>
                    <Graph tickFormat={this.state.tickFormat} tickValues={this.state.tickValues} data={this.state.dataGraph2} explanation1="ao" explanation2="å" title="Ao-lyden"/>
                    <Graph tickFormat={this.state.tickFormat} tickValues={this.state.tickValues} data={this.state.dataGraph3} explanation1="i"  explanation2="a" title="Bunden form eintal av sterke hokjønnssubstantiv og fleirtal av inkjekjønnssubstantiv"/>
                    <Graph tickFormat={this.state.tickFormat} tickValues={this.state.tickValues} data={this.state.dataGraph4} explanation1="adn/edn" explanation2="ane/ene" title="Bunden form fleirtal av hokjønns- og hannkjønnssubstantiv"/>
                    <Graph tickFormat={this.state.tickFormat} tickValues={this.state.tickValues} data={this.state.dataGraph5} explanation1="dl" explanation2="ll" title="Segmentering av ll > dl"/>
                    <Graph tickFormat={this.state.tickFormat} tickValues={this.state.tickValues} data={this.state.dataGraph6} explanation1="dn" explanation2="rn" title="Differensiering av rn > dn"/>
                </div>
            </div>
        );
    }
}

export default GraphPage;