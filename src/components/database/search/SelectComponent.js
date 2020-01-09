import React from 'react';
import ReactSelect from 'react-select';

class Select extends React.Component {

    state = {
        selectedOption: null,
    };

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });

        if(selectedOption != null){
            this.props.onSelectUpdate(this.props.res, selectedOption.value);
        }else{
            this.props.onSelectUpdate(this.props.res, "");
        }
    };

    render () {
        return (
            <div className="selectItem">
                <span className="section-heading">{this.props.label}:</span>
                <ReactSelect ref="stateSelect"
                             placeholder=""
                             options={this.props.data}
                             simpleValue
                             name="selected-state"
                             value={this.state.selectValue}
                             onChange={this.handleChange}
                             isClearable
                             searchable={false} />
            </div>
        );
    }
}

export default Select;