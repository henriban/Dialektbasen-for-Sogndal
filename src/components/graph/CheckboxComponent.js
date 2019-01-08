import React from 'react';

class Checkbox extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isChecked: this.props.isChecked,
            // isChecked: false,
            label: this.props.label
        };
    }

    toggleCheckboxChange() {
        this.props.handleCheckboxChange(this.props.label, this.props.res);
    };

    render() {
        const { label } = this.props;
        const { isChecked } = this.state;

        return (
            <div>
                <label>
                    <input
                        type="checkbox"
                        value={label}
                        checked={isChecked}
                        onChange={this.toggleCheckboxChange.bind(this)}
                    />
                    {label}
                </label>
            </div>
        );
    }
}

export default Checkbox;