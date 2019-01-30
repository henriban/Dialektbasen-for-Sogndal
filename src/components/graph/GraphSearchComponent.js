import React from 'react';

import CheckboxComponent from './CheckboxClusterComponent';
import FilterViewer from './FilterViewComponent';
import Variables from '../../data/searchVariables';

import '../../styles/graph/checkbox.scss';

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
    }

    toggleCheckbox = (checkedValues, resLabel) => {
        let newFilters = this.state.filters;
        newFilters[resLabel] = checkedValues;

        this.props.setFilter(this.state.filters);
    };

    render(){
        return(
            <div className="graphSearchArea">
                <FilterViewer filters={this.state.filters}/>
                <br/>
                "Huk av for de trekkene du ønsker å filtrere på. Hvis ingen er huket av vil alle vises"
                <div className="checkboxSearchWrapper">
                    <CheckboxComponent onCheckUpdate={this.toggleCheckbox} label="Stad"               variables={Variables.place}              res="place"/>
                    <CheckboxComponent onCheckUpdate={this.toggleCheckbox} label="Kjønn"              variables={Variables.gender}             res="gender"/>
                    <CheckboxComponent onCheckUpdate={this.toggleCheckbox} label="Alder"              variables={Variables.age}                res="age"/>
                    <CheckboxComponent onCheckUpdate={this.toggleCheckbox} label="Fødselstidspunkt"   variables={Variables.birth}              res="birth"/>
                    <CheckboxComponent onCheckUpdate={this.toggleCheckbox} label="Opptakstidspunkt"   variables={Variables.date_of_recording}  res="date_of_recording"/>
                    <CheckboxComponent onCheckUpdate={this.toggleCheckbox} label="Utdanning"          variables={Variables.education}          res="education"/>
                    <CheckboxComponent onCheckUpdate={this.toggleCheckbox} label="Yrke"               variables={Variables.occupation}         res="occupation"/>
                    <CheckboxComponent onCheckUpdate={this.toggleCheckbox} label="Foreldrebakgrunn"   variables={Variables.parents_background} res="parents_background"/>
                    <CheckboxComponent onCheckUpdate={this.toggleCheckbox} label="Type informant"     variables={Variables.panel}              res="panel"/>
                </div>
            </div>
        );
    }
}

export default graphSearchComponent;