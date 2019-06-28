import React from 'react';

import Graph from './GraphComponent';
import GraphSearch from './GraphSearchComponent';
import RadioButtons  from './RadioButtonComponent';

// import { TestDataFromInformersText }from './TestDataFromInformersText';

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

            dataFromLocalStorage: {},

            dataGraph1: [],
            dataGraph2: [],
            dataGraph3: [],
            dataGraph4: [],
            dataGraph5: [],
            dataGraph6: [],

            filteredTestDataFromInformersText: [],
            searchLabel: "place",
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

    // Newest
    splitDataBetweenGraphs(filteredLocalStorage){
        let graph1 = [];
        let graph2 = [];
        let graph3 = [];
        let graph4 = [];
        let graph5 = [];
        let graph6 = [];

        const variables = {
            infinitiv_a : "a",
            infinitiv_e : "e",
            infinitiv_anna : "Anna_a_e",
            ao : "ao",
            å :"å",
            anna_ao_å : "Anna_ao_å",
            bundanForm_i : "i",
            bundanForm_a : "b_a", //TODO: Fuckup?
            bundanForm_anna : "Anna_i_a",
            adnedn : "adn/edn",
            aneene : "ane/ene",
            anna_adnedn_aneene : "Anna_adnedn_aneene",
            dl : "dl",
            ll : "ll",
            anna_dl_ll : "Anna_dl_ll",
            dn : "dn",
            rn : "rn",
            anna_dn_rn : "Anna_dn_rn",
        };

        for(let label in filteredLocalStorage){
            if(filteredLocalStorage.hasOwnProperty(label)) {
                let variablesFromLocalStorage = filteredLocalStorage[label];

                graph1.push([this.returnZeroIfUndefined(variablesFromLocalStorage[variables["infinitiv_a"]]),    this.returnZeroIfUndefined(variablesFromLocalStorage[variables["infinitiv_e"]]),  this.returnZeroIfUndefined(variablesFromLocalStorage[variables["infinitiv_anna"]])]);
                graph2.push([this.returnZeroIfUndefined(variablesFromLocalStorage[variables["ao"]]),             this.returnZeroIfUndefined(variablesFromLocalStorage[variables["å"]]),            this.returnZeroIfUndefined(variablesFromLocalStorage[variables["anna_ao_å"]])]);
                graph3.push([this.returnZeroIfUndefined(variablesFromLocalStorage[variables["bundanForm_i"]]),   this.returnZeroIfUndefined(variablesFromLocalStorage[variables["bundanForm_a"]]), this.returnZeroIfUndefined(variablesFromLocalStorage[variables["bundanForm_anna"]])]);
                graph4.push([this.returnZeroIfUndefined(variablesFromLocalStorage[variables["adnedn"]]),         this.returnZeroIfUndefined(variablesFromLocalStorage[variables["aneene"]]),       this.returnZeroIfUndefined(variablesFromLocalStorage[variables["anna_adnedn_aneene"]])]);
                graph5.push([this.returnZeroIfUndefined(variablesFromLocalStorage[variables["dl"]]),             this.returnZeroIfUndefined(variablesFromLocalStorage[variables["ll"]]),           this.returnZeroIfUndefined(variablesFromLocalStorage[variables["anna_dl_ll"]])]);
                graph6.push([this.returnZeroIfUndefined(variablesFromLocalStorage[variables["dn"]]),             this.returnZeroIfUndefined(variablesFromLocalStorage[variables["rn"]]),           this.returnZeroIfUndefined(variablesFromLocalStorage[variables["anna_dn_rn"]])]);
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
                    <Graph tickFormat={this.state.tickFormat} tickValues={this.state.tickValues} data={this.state.dataGraph1} explanation1="a"          explanation2="e"        title="Infinitiv"/>
                    <Graph tickFormat={this.state.tickFormat} tickValues={this.state.tickValues} data={this.state.dataGraph2} explanation1="ao"         explanation2="å"        title="Ao-lyden"/>
                    <Graph tickFormat={this.state.tickFormat} tickValues={this.state.tickValues} data={this.state.dataGraph3} explanation1="i"          explanation2="a"        title="Bunden form eintal av sterke hokjønnssubstantiv og fleirtal av inkjekjønnssubstantiv"/>
                    <Graph tickFormat={this.state.tickFormat} tickValues={this.state.tickValues} data={this.state.dataGraph4} explanation1="adn/edn"    explanation2="ane/ene"  title="Bunden form fleirtal av hokjønns- og hannkjønnssubstantiv"/>
                    <Graph tickFormat={this.state.tickFormat} tickValues={this.state.tickValues} data={this.state.dataGraph5} explanation1="dl"         explanation2="ll"       title="Segmentering av ll > dl"/>
                    <Graph tickFormat={this.state.tickFormat} tickValues={this.state.tickValues} data={this.state.dataGraph6} explanation1="dn"         explanation2="rn"       title="Differensiering av rn > dn"/>
                </div>
            </div>
        );
    }
}

export default GraphPage;