import React from 'react';

import Graph from './GraphComponent';
import GraphSearch from './GraphSearchComponent';
import RadioButtons  from './RadioButtonComponent';

import Informers from "../../data/informers";
import SearchVariables from "../../data/searchVariables";
// import GraphTraitsSelection from './graphTraitsSelectionComponent';

import '../../styles/graph/graph.scss';

// Test result from graphSearch
let graphSearchResult = [
    {label: "Kvinne", value: ["inf01", "inf01p", "inf02", "inf02p", "inf05", "inf06", "inf05p", "inf06p"] },
    {label: "Mann",   value: ["inf03", "inf04"]}
];


// let data = [
//     [
//         {x: 1, y: 5},
//         {x: 2, y: 3},
//         {x: 3, y: 1},
//         {x: 4, y: 2}
//     ],
//     [
//         {x: 1, y: 1},
//         {x: 2, y: 2},
//         {x: 3, y: 4},
//         {x: 4, y: 2}
//     ],
//     [
//         {x: 1, y: 2},
//         {x: 2, y: 5},
//         {x: 3, y: 2},
//         {x: 4, y: 2}
//     ],
//
// ];

let informersData = {};

class GraphPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
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

    getFilter(filteredInfList, filterRows){
        let listOfInf = [];
        filteredInfList.map(inf => listOfInf.push(inf.id));


        // console.log("FilterRows", filters);
        // console.log("List of all IDs", listOfInf);
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

    render(){

        for (let i in graphSearchResult){
            if(graphSearchResult.hasOwnProperty(i)){

            }
        }

        return(
            <div>
                <RadioButtons setSearchLabels={this.setSearchLabels.bind(this)}/>
                <GraphSearch setFilter={this.getFilter.bind(this)}/>

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