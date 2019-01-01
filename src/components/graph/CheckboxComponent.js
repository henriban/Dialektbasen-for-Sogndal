import React from 'react';

class Checkbox extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            // isChecked: this.props.checked,
            isChecked: false,
            label: this.props.label
        };
    }


    // toggleCheckboxChange = () => {
    //     // this.setState(({ isChecked }) => ({
    //     //         isChecked: !isChecked
    //     //     }
    //     // ));
    //
    //     this.setState({
    //         isChecked: !this.state.isChecked
    //     });
    //
    //
    //     this.props.handleCheckboxChange(this.props.label, this.props.res, !this.state.isChecked);
    // };

    toggleCheckboxChange() {

        this.setState({
            isChecked: !this.state.isChecked
        });

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