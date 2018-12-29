import React from 'react';

import Checkbox from './checkboxComponent';

export default class GraphTraitsSelection extends React.Component{

    toggleCheckbox = label => {
        for (const checkbox of this.selectedCheckboxes) {
            console.log(checkbox, 'is selected.');
        }
        if (this.selectedCheckboxes.has(label)) {
            this.selectedCheckboxes.delete(label);
        } else {
            this.selectedCheckboxes.add(label);
        }
        console.log(this.selectedCheckboxes)
    };

    render(){
        return(
            <div className="traitsSelection">
                <Checkbox label="Infinitiv" handleCheckboxChange={this.toggleCheckbox}/>
                <Checkbox label="Ao-lyden" handleCheckboxChange={this.toggleCheckbox}/>
                <Checkbox label="Bunden form eintal av sterke hokjønnssubstantiv og fleirtal av inkjekjønnssubstantiv" handleCheckboxChange={this.toggleCheckbox}/>
                <Checkbox label="Bunden form fleirtal av hokjønns- og hannkjønnssubstantiv" handleCheckboxChange={this.toggleCheckbox}/>
                <Checkbox label="Segmentering av ll > dl" handleCheckboxChange={this.toggleCheckbox}/>
                <Checkbox label="Differensiering av rn > dn" handleCheckboxChange={this.toggleCheckbox}/>
            </div>
        );
    }
}