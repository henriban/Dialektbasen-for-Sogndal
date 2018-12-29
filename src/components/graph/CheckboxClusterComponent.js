import React from 'react'
import Checkbox from './CheckboxComponent';

let key = 0;

export default class checkboxComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isChecked: false,
            res: this.props.res,
            checkStr: [],
            label: this.props.label
        };
    }
     
   
    setLabelCheckStr(label){
        let checked = this.state.checkStr;
        if(!checked.includes(label)){
            checked.push(label);
        }else {
            this.removeLabelCheckStr(label)
        }
    }

    removeLabelCheckStr(label){
        let checked = this.state.checkStr;
        let index = checked.indexOf(label);
        checked.splice(index, 1);
    } 

    toggleCheckbox = (label, res, isChecked) => {
        if(label.includes(this.props.label)){
            this.setState({
                isChecked: !this.state.isChecked
            });
            // Remove checked labels from checkStr in cluster (when cluster label clicked or add/remove single labels
            this.state.isChecked ?
                this.props.data.map(item => this.removeLabelCheckStr(item.label)) :
                this.props.data.map(item => this.setLabelCheckStr(item.label));
        }else{
            this.setLabelCheckStr(label)
        }

        console.log(label);
        this.props.onCheckUpdate(this.state.checkStr, res, isChecked);
    };

    render(){
        return(
            <div className="checkboxItem">
                {/*<Checkbox label={this.props.label} handleCheckboxChange={this.toggleCheckbox} checked={this.state.isChecked} res={this.props.res}/>*/}
                <span>{this.state.label}</span>
                <div className="childCheckbox">
                    {this.props.data.map(item => {
                        return(
                            <Checkbox label={item.label} handleCheckboxChange={this.toggleCheckbox} key={key++} checked={this.state.isChecked} res={this.props.res}/>
                        );})}
                </div>
            </div>
        );
    }
}   