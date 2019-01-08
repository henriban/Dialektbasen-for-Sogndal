import React from 'react';

import Graph from './GraphComponent';
import GraphSearch from './GraphSearchComponent';
import RadioButtons  from './RadioButtonComponent';

import Informers from "../../data/informers";
import SearchVariables from "../../data/searchVariables";
// import GraphTraitsSelection from './graphTraitsSelectionComponent';

import '../../styles/graph/graph.scss';

let informersData = {};

class GraphPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            filters: [],
            filteredInformers: [],

            tickFormat: [], // labels for Victory Axis
            tickValues: [], // number of different labels ex: [1,2,3]

            data1: [],
            data2: [],
            data3: [],
            data4: [],
            data5: [],
            data6: [],
        };
    }

    componentDidMount(){
        this.generateDataFromLocalStorage();
    }

    setFilter(filters){
        this.setState({
            filters: filters,
            filteredInformers: this.getFilteredInformers(filters)
        });
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

        let tickFormat = [];
        let tickValues = [];
        let index = 0;

        SearchVariables[searchLabel].map(item => tickFormat.push(item.label));
        tickFormat.map(tick => tickValues.push(++index));

        this.setState({
            tickFormat: tickFormat,
            tickValues: tickValues
        });

        this.generateData(tickValues.length);
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

        this.setState({
            data1: data,
            data2: data,
            data3: data,
            data4: data,
            data5: data,
            data6: data,
        });
    }

    generateDataFromInformersData(){

    }

    testFilteredInformers(){

        // console.log("Not include", this.getAllInformers().filter(inf => !this.state.filteredInformers.includes(inf)));

        let filteredInformersId = [];
        this.state.filteredInformers.map(inf => filteredInformersId.push(inf.id));

        let allInformersId = [];
        this.getAllInformers().map(inf => allInformersId.push(inf.id));

        console.log("Not include", allInformersId.filter(n => !filteredInformersId.includes(n)));
    }



    render(){

        // this.testFilteredInformers();

        return(
            <div>
                <RadioButtons setSearchLabels={this.setSearchLabels.bind(this)}/>
                <GraphSearch setFilter={this.setFilter.bind(this)}/>

                <div className="graphPage">
                    <Graph tickFormat={this.state.tickFormat} tickValues={this.state.tickValues} data={this.state.data1} title="Infinitiv"/>
                    <Graph tickFormat={this.state.tickFormat} tickValues={this.state.tickValues} data={this.state.data2} title="Ao-lyden"/>
                    <Graph tickFormat={this.state.tickFormat} tickValues={this.state.tickValues} data={this.state.data3} title="Bunden form eintal av sterke hokjønnssubstantiv og fleirtal av inkjekjønnssubstantiv"/>
                    <Graph tickFormat={this.state.tickFormat} tickValues={this.state.tickValues} data={this.state.data4} title="Bunden form fleirtal av hokjønns- og hannkjønnssubstantiv"/>
                    <Graph tickFormat={this.state.tickFormat} tickValues={this.state.tickValues} data={this.state.data5} title="Segmentering av ll > dl"/>
                    <Graph tickFormat={this.state.tickFormat} tickValues={this.state.tickValues} data={this.state.data6} title="Differensiering av rn > dn"/>
                </div>
            </div>
        );
    }
}

export default GraphPage;