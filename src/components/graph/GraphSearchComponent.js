import React from 'react';

import CheckboxComponent from './CheckboxClusterComponent';
// import FilterViewer from './FilterViewComponent';
import Variables from '../../data/searchVariables';
import Informers from '../../data/informers';

import '../../styles/graph/checkbox.scss';

let filteredInfList = [];    

class graphSearchComponent extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            filters: {
                place: [],
                gender: [],
                age: [],
                birth: [],
                date_of_recording: [],
                education: [],
                occupation: [],
                parents_background: [],
                panel: []
            },
        };

        filteredInfList = this.initAllInf();
    }

    initAllInf(){
        let rows = [];
        Informers.map(item =>
            rows.push({
                id: item.id,
                place: item.place.trim(),
                gender: item.gender.trim(),
                age: item.age.trim(),
                birth: item.birth.trim(),
                date_of_recording: item.date_of_recording.trim(),
                education: item.education.trim(),
                occupation: item.occupation.trim(),
                parents_background: item.parents_background.trim(),
                panel: item.panel.trim()
            })
        );

        return rows;
    }

    // pushToList(list, object){
    //     if(!list.includes(object)){
    //         list.push(object);
    //     }
    // }

    toggleCheckbox = (checkedValues, resLabel, isChecked) => {
        let newFilters = this.state.filters;
        newFilters[resLabel] = checkedValues;

        let newFilteredInformers = [];

        if(isChecked){

            // Filter the rows, if the filters is empty don't do anything. If not empty, iterate through Informers and find matches
            if(filteredInfList.length > 0){
                this.state.filters[resLabel].map(filter => !filter.length ? null :
                    filteredInfList.map(inf => inf[resLabel].includes(filter) ? newFilteredInformers.push(inf) : null ));
            }else{
                this.state.filters[resLabel].map(filter => !filter.length ? null :
                    Informers.map(inf => inf[resLabel].includes(filter) ? newFilteredInformers.push(inf) : null ));
            }
        }else{
            for(let res in this.state.filters){
                if(this.state.filters.hasOwnProperty(res) && res.length > 0) {
                    this.state.filters[res].map(filter => !filter.length ? null :
                        Informers.map(inf => inf[res].includes(filter) ? newFilteredInformers.push(inf) : null));
                }
            }
        }

        filteredInfList = newFilteredInformers;
        console.log("ActiveRow", filteredInfList);
        console.log("State FilterRow", this.state.filters);
        let totalNumberOfInf = 0;
        Informers.map(inf => totalNumberOfInf++);
        console.log("totalNumberOfInf: ", totalNumberOfInf);

        this.props.setFilter(filteredInfList, this.state.filters);
    };

    render(){
        return(
            <div className="graphSearchArea">
                {/*<FilterViewer filters={this.state.filterViewer}/>*/}
                <div className="checkboxSearchWrapper">
                    <CheckboxComponent onCheckUpdate={this.toggleCheckbox} label="Stad"               data={Variables.place}              res="place"/>
                    <CheckboxComponent onCheckUpdate={this.toggleCheckbox} label="Kjønn"              data={Variables.gender}             res="gender"/>
                    <CheckboxComponent onCheckUpdate={this.toggleCheckbox} label="Alder"              data={Variables.age}                res="age"/>
                    <CheckboxComponent onCheckUpdate={this.toggleCheckbox} label="Fødselstidspunkt"   data={Variables.birth}              res="birth"/>
                    <CheckboxComponent onCheckUpdate={this.toggleCheckbox} label="Opptakstidspunkt"   data={Variables.date_of_recording}  res="date_of_recording"/>
                    <CheckboxComponent onCheckUpdate={this.toggleCheckbox} label="Utdanning"          data={Variables.education}          res="education"/>
                    <CheckboxComponent onCheckUpdate={this.toggleCheckbox} label="Yrke"               data={Variables.occupation}         res="occupation"/>
                    <CheckboxComponent onCheckUpdate={this.toggleCheckbox} label="Foreldrebakgrunn"   data={Variables.parents_background} res="parents_background"/>
                    <CheckboxComponent onCheckUpdate={this.toggleCheckbox} label="Type informant"     data={Variables.panel}              res="panel"/>
                </div>
            </div>
        );
    }
}

export default graphSearchComponent;