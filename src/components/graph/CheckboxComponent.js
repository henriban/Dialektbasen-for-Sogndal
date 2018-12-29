import React from 'react';

class Checkbox extends React.Component{
    state = {
        isChecked: this.props.checked,
        label: this.props.label
    };

    toggleCheckboxChange = () => {

        this.setState(({ isChecked }) => ({
                isChecked: !isChecked
            }
        ));

        this.props.handleCheckboxChange(this.props.label, this.props.res, !this.state.isChecked);
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
                        onChange={this.toggleCheckboxChange}
                    />

                    {label}
                </label>
            </div>
        );
    }
}

export default Checkbox;