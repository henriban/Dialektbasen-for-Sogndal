import React from 'react';

import SelectItem from './SelectComponent';
import Variables from '../../../data/searchVariables';

import '../../../styles/database/search.scss';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            filters: {
                place: '',
                gender: '',
                age: '',
                birth: '',
                date_of_recording: '',
                education: '',
                occupation: '',
                parents_background: '',
                panel: ''
            }
        };
    }

    handleChange(res, value){
        let new_filterRows = this.state.filters;

        if(value === null){
            value = '';
        }

        new_filterRows[res] = value;
        this.setState({ filters: new_filterRows });

        this.props.onSearchChange(this.state.filters);
    }

    render(){
        return(
            <div>
                <div className="selectWrapper">
                    <SelectItem  onSelectUpdate={this.handleChange} label="Stad"               data={Variables.place}               res="place"/>
                    <SelectItem  onSelectUpdate={this.handleChange} label="Kjønn"              data={Variables.gender}              res="gender"/>
                    <SelectItem  onSelectUpdate={this.handleChange} label="Alder"              data={Variables.age}                 res="age"/>
                    <SelectItem  onSelectUpdate={this.handleChange} label="Fødselstidspunkt"   data={Variables.birth}               res="birth"/>
                    <SelectItem  onSelectUpdate={this.handleChange} label="Opptakstidspunkt"   data={Variables.date_of_recording}   res="date_of_recording"/>
                    <SelectItem  onSelectUpdate={this.handleChange} label="Utdanning"          data={Variables.education}           res="education"/>
                    <SelectItem  onSelectUpdate={this.handleChange} label="Yrke"               data={Variables.occupation}          res="occupation"/>
                    <SelectItem  onSelectUpdate={this.handleChange} label="Foreldrebakgrunn"   data={Variables.parents_background}  res="parents_background"/>
                    <SelectItem  onSelectUpdate={this.handleChange} label="Type informant"     data={Variables.panel}               res="panel"/>
                </div>
                {/* TODO: Reset button*/}
            </div>
        );
    }
}

export default Search;