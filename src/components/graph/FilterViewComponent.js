import React, {Component} from 'react';

class FilterView extends Component {

    constructor(props){
        super(props);
        this.state = {
            filters: this.props.filters
        };
    }

    generateFilterView(){

        let filters = this.state.filters;
        let filterView = "";

        for(let key in filters){
            if(filters.hasOwnProperty(key)){
                filterView += filters[key]
                // filters[key].map(item => console.log(item));
                // filters[key].map(item => filterView += item + " ");
            }
        }

        return (
            <span> {filterView} </span>
        );
    }

    render() {

        return (
            <div>
                Hvis hva du søker på:
                {/*{this.props.filters.place}*/}
                {this.generateFilterView()}
            </div>
        );
    }
}

export default FilterView;