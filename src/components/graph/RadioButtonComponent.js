import React from 'react';

import Variables from '../../data/tableColumns';
import '../../styles/graph/radiobuttons.scss';

class RadioButtons extends React.Component{

    setSearchLabels(event){
        this.props.setSearchLabels(event.target.value)
    }

    generateRadioButtons(){
        return Variables.map(function(variable) {
            if(variable.name !== 'Inf.'){
                return(
                    <label key={variable.num} htmlFor={variable.name}>
                        <input id={variable.name} type="radio" value={variable.key} name="graphLabelSelector"/>
                        {variable.name}
                    </label>);
            }
            return null;
        });
    }

    render(){
        return(
            <form className="radioButtonsWrapper" onChange={this.setSearchLabels.bind(this)}>
                {this.generateRadioButtons()}
            </form>
        );
    }
}

export default RadioButtons;