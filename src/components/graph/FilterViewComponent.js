import React, {Component} from 'react';

class FilterView extends Component {


    // generateFilterView(){
    //
    //     let filters = this.props.filters;
    //     let filterView = "";
    //
    //     for(let key in filters){
    //         if(filters.hasOwnProperty(key)){
    //             // filters[key].map(item => filterView += item + " ")
    //         }
    //     }
    //
    //     return (
    //         <span> {filterView} </span>
    //     );
    // }

    render() {


        return (
            <div>
                Hvis hva du søker på:
                {this.props.filters}
            </div>
        );
    }
}

export default FilterView;