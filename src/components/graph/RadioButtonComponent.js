import React from 'react';

import Variables from '../../data/tableColumns';
import '../../styles/graph/radiobuttons.scss';

class RadioButtons extends React.Component{

    setSearchLabels(event){
        this.props.setSearchLabels(event.target.value)
    }

    generateRadioButtons(){
        return Variables.map(function(variable) {
            // Check off place radiobutton by default
            if(variable.name === "Stad"){
                return(
                    <label key={variable.num} htmlFor={variable.name}>
                        <input id={variable.name}
                               type="radio"
                               value={variable.key}
                               name="graphLabelSelector"
                               defaultChecked/>
                        {variable.name}
                    </label>);
            }
            if(variable.name !== 'Inf.' && variable.name !== "Stad"){
                return(
                    <label key={variable.num} htmlFor={variable.name}>
                        <input id={variable.name}
                               type="radio"
                               value={variable.key}
                               name="graphLabelSelector"/>
                        {variable.name}
                    </label>);
            }
            return null;
        });
    }

    render(){
        return(
            <div className="radioButtonsWrapper">
                <p className="graphLabel">Vel verdiar som skal visast på x-aksen</p>
                <form className="radioButtonsContent" onChange={this.setSearchLabels.bind(this)}>
                    {this.generateRadioButtons()}
                </form>
            </div>

        );
    }
}

export default RadioButtons;