import React from 'react';

import Graph from './GraphComponent';
import GraphSearch from './GraphSearchComponent';
import RadioButtons  from './RadioButtonComponent';

// import { TestDataFromInformersText }from './TestDataFromInformersText';

import Informers from "../../data/informers";
import SearchVariables from "../../data/searchVariables";
import Variables from "../../data/variables";
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

            dataFromLocalStorage: {},

            dataGraph1: [],
            dataGraph2: [],
            dataGraph3: [],
            dataGraph4: [],
            dataGraph5: [],
            dataGraph6: [],

            filteredTestDataFromInformersText: [],
            searchLabel: "place", // Default search on place
            filteredDemoInf: [],
            filteredInformersDividedOnSearchLabel: {}
        };
    }

    // Set the default value of the radio button
    componentDidMount(){
        this.setSearchLabels(this.state.searchLabel);
    }

    setSearchLabels(searchLabel){

        let tickFormat = [];
        let tickValues = [];
        let index = 0;

        SearchVariables[searchLabel].map(label => tickFormat.push(label.label));
        tickFormat.map(tick => tickValues.push(++index));

        this.setState({
            tickFormat: tickFormat,
            tickValues: tickValues,
            searchLabel: searchLabel
        }, () => {
            this.update();
        });
    }

    setFilter(filters){
        this.setState({
            filters: filters,
            filteredInformers: this.getFilteredInformers(filters)
        }, () => {this.update()});
    }

    update(){
        if(this.state.searchLabel != null){

            let filteredLocalStorage = this.filterOutInformersFromLocalStorage(
                this.getDataFromLocalStorage(),
                this.getFilteredInformersDividedOnSearchLabel(this.state.searchLabel)
            );

            this.splitDataBetweenGraphs(filteredLocalStorage);
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

    getDataFromLocalStorage(){

        Informers.forEach(function (inf) {
            let infData = JSON.parse(localStorage.getItem(inf.id));

            if (infData != null) {
                let counts = {};
                for (let i = 0; i < infData.length; i++) {
                    let data = infData[i];
                    if (data != null && data.trim() !== "") {
                        counts[infData[i]] = 1 + (counts[infData[i]] || 0);
                    }
                }
                informersData[inf.id] = counts;
            }
        });

        return informersData;
    }

    getFilteredInformersDividedOnSearchLabel(searchLabel){
        let filteredInformersDividedOnSearchLabel = {};

        SearchVariables[searchLabel].map(label => filteredInformersDividedOnSearchLabel[label.label] = []);
        this.state.filteredInformers.map(inf => filteredInformersDividedOnSearchLabel[inf[searchLabel]] = filteredInformersDividedOnSearchLabel[inf[searchLabel]].concat(inf));

        return filteredInformersDividedOnSearchLabel;
    }

    filterOutInformersFromLocalStorage(localStorage, filter){

        // let filterIDs = [];
        let filteredIDsByLabel = {};

        // Get all informer IDs from filteredInformers divided on labels
        for(let filterLabel in filter){
            if(filter.hasOwnProperty(filterLabel)) {
                let filterIDs = [];
                filter[filterLabel].map(inf => filterIDs.push(inf.id));
                filteredIDsByLabel[filterLabel] = filterIDs;
            }
        }

        let filteredLocalStorage = {};

        // Go through all all IDs from filter by label
        for (let label in filteredIDsByLabel){
            if(filteredIDsByLabel.hasOwnProperty(label)) {

                let localStorageData = [];

                // Divided localStorage data by label
                for(let infID in localStorage) {
                    if(localStorage.hasOwnProperty(infID)) {

                        if(filteredIDsByLabel[label].includes(infID)){
                            localStorageData.push(localStorage[infID]);
                        }
                    }
                }

                filteredLocalStorage[label] = localStorageData;
            }
        }

        // For each label, sum all localStorage variables
        for(let label in filteredLocalStorage){
            if(filteredLocalStorage.hasOwnProperty(label)) {

                let counts = {};

                for (let i = 0; i < filteredLocalStorage[label].length; i++) {

                    let variableCount = filteredLocalStorage[label][i];

                    for(let variable in variableCount){
                        if(variableCount.hasOwnProperty(variable)) {
                            counts[variable] = variableCount[variable] + (counts[variable] || 0);
                        }
                    }
                }
                filteredLocalStorage[label] = counts;
            }
        }

        return(filteredLocalStorage);
    }

    splitDataBetweenGraphs(filteredLocalStorage){
        let graph1 = [];
        let graph2 = [];
        let graph3 = [];
        let graph4 = [];
        let graph5 = [];
        let graph6 = [];

        for(let label in filteredLocalStorage){
            if(filteredLocalStorage.hasOwnProperty(label)) {
                let variablesFromLocalStorage = filteredLocalStorage[label];

                // console.log(variablesFromLocalStorage);

                // graph1.push([this.returnZeroIfUndefined(variablesFromLocalStorage[Variables.infinitiv_a]),    this.returnZeroIfUndefined(variablesFromLocalStorage[Variables.infinitiv_e]),  this.returnZeroIfUndefined(variablesFromLocalStorage[Variables.infinitiv_anna])]);
                // graph2.push([this.returnZeroIfUndefined(variablesFromLocalStorage[Variables.ao]),             this.returnZeroIfUndefined(variablesFromLocalStorage[Variables.å]),            this.returnZeroIfUndefined(variablesFromLocalStorage[Variables.anna_ao_å])]);
                // graph3.push([this.returnZeroIfUndefined(variablesFromLocalStorage[Variables.bundanForm_i]),   this.returnZeroIfUndefined(variablesFromLocalStorage[Variables.bundanForm_a]), this.returnZeroIfUndefined(variablesFromLocalStorage[Variables.bundanForm_anna])]);
                // graph4.push([this.returnZeroIfUndefined(variablesFromLocalStorage[Variables.adnedn]),         this.returnZeroIfUndefined(variablesFromLocalStorage[Variables.aneene]),       this.returnZeroIfUndefined(variablesFromLocalStorage[Variables.anna_adnedn_aneene])]);
                // graph5.push([this.returnZeroIfUndefined(variablesFromLocalStorage[Variables.dl]),             this.returnZeroIfUndefined(variablesFromLocalStorage[Variables.ll]),           this.returnZeroIfUndefined(variablesFromLocalStorage[Variables.anna_dl_ll])]);
                // graph6.push([this.returnZeroIfUndefined(variablesFromLocalStorage[Variables.dn]),             this.returnZeroIfUndefined(variablesFromLocalStorage[Variables.rn]),           this.returnZeroIfUndefined(variablesFromLocalStorage[Variables.anna_dn_rn])]);

                graph1.push([this.returnZeroIfUndefined(variablesFromLocalStorage[Symbols.infinitiv_a]),    this.returnZeroIfUndefined(variablesFromLocalStorage[Symbols.infinitiv_e]),  this.returnZeroIfUndefined(variablesFromLocalStorage[Symbols.infinitiv_anna])]);
                graph2.push([this.returnZeroIfUndefined(variablesFromLocalStorage[Symbols.ao]),             this.returnZeroIfUndefined(variablesFromLocalStorage[Symbols.å]),            this.returnZeroIfUndefined(variablesFromLocalStorage[Symbols.anna_ao_å])]);
                graph3.push([this.returnZeroIfUndefined(variablesFromLocalStorage[Symbols.bundanForm_i]),   this.returnZeroIfUndefined(variablesFromLocalStorage[Symbols.bundanForm_a]), this.returnZeroIfUndefined(variablesFromLocalStorage[Symbols.bundanForm_anna])]);
                graph4.push([this.returnZeroIfUndefined(variablesFromLocalStorage[Symbols.adnedn]),         this.returnZeroIfUndefined(variablesFromLocalStorage[Symbols.aneene]),       this.returnZeroIfUndefined(variablesFromLocalStorage[Symbols.anna_adnedn_aneene])]);
                graph5.push([this.returnZeroIfUndefined(variablesFromLocalStorage[Symbols.dl]),             this.returnZeroIfUndefined(variablesFromLocalStorage[Symbols.ll]),           this.returnZeroIfUndefined(variablesFromLocalStorage[Symbols.anna_dl_ll])]);
                graph6.push([this.returnZeroIfUndefined(variablesFromLocalStorage[Symbols.dn]),             this.returnZeroIfUndefined(variablesFromLocalStorage[Symbols.rn]),           this.returnZeroIfUndefined(variablesFromLocalStorage[Symbols.anna_dn_rn])]);
            }
        }

        this.setState({
            dataGraph1: this.divideBarGraph(graph1),
            dataGraph2: this.divideBarGraph(graph2),
            dataGraph3: this.divideBarGraph(graph3),
            dataGraph4: this.divideBarGraph(graph4),
            dataGraph5: this.divideBarGraph(graph5),
            dataGraph6: this.divideBarGraph(graph6),
        });
    }

    returnZeroIfUndefined(number){
        return number !== undefined ? number : 0;
    }

    divideBarGraph(data){

        let graphData = [];

        for(let i = 0; i < 3; i++){
            let barData = [];
            for(let j = 0; j < data.length; j++){
                barData.push({x: j + 1, y: data[j][i]});
            }
            graphData.push(barData);
        }

        return graphData;
    }

    render(){

        return(
            <div>
                <RadioButtons setSearchLabels={this.setSearchLabels.bind(this)}/>
                <GraphSearch setFilter={this.setFilter.bind(this)}/>

                <div className="graphPage">
                    <Graph tickFormat={this.state.tickFormat} tickValues={this.state.tickValues} data={this.state.dataGraph1} explanation1={Variables.infinitiv_a}      explanation2={Variables.infinitiv_e}    title="Infinitiv"/>
                    <Graph tickFormat={this.state.tickFormat} tickValues={this.state.tickValues} data={this.state.dataGraph2} explanation1={Variables.ao}               explanation2={Variables.å}              title="Ao-lyden"/>
                    <Graph tickFormat={this.state.tickFormat} tickValues={this.state.tickValues} data={this.state.dataGraph3} explanation1={Variables.bundanForm_i}     explanation2={Variables.bundanForm_a}   title="Bunden form eintal av sterke hokjønnssubstantiv og fleirtal av inkjekjønnssubstantiv"/>
                    <Graph tickFormat={this.state.tickFormat} tickValues={this.state.tickValues} data={this.state.dataGraph4} explanation1={Variables.adnedn}           explanation2={Variables.aneene}         title="Bunden form fleirtal av hokjønns- og hannkjønnssubstantiv"/>
                    <Graph tickFormat={this.state.tickFormat} tickValues={this.state.tickValues} data={this.state.dataGraph5} explanation1={Variables.dl}               explanation2={Variables.ll}             title="Segmentering av ll > dl"/>
                    <Graph tickFormat={this.state.tickFormat} tickValues={this.state.tickValues} data={this.state.dataGraph6} explanation1={Variables.dn}               explanation2={Variables.rn}             title="Differensiering av rn > dn"/>
                </div>
            </div>
        );
    }
}

export default GraphPage;