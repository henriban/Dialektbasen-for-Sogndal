import React from 'react';

import Search from './search/SearchComponent';
import TextWindow from './textWindow/TextWindowComponent';
import Table from './TableComponent';

import Informers from '../../data/informers';

import '../../styles/database/database.scss';

class Database extends React.Component {
    constructor(props) {
        super(props);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onShowResultChange = this.onShowResultChange.bind(this);

        this.state = {
            showTextWindow: false,
            resultId: 0,
            rows: this.getRows(),
            filteredList: this.getRows(),
            searchList: []
        };
    }

    getRows(){
        let rows = [];
        Informers.map(item =>
            rows.push({
                id: item.id,
                place: item.place.trim(),
                gender: item.gender.trim(),
                age: item.age.trim(),
                birth: item.birth.trim(),
                date_of_recording: item.date_of_recording.trim(),
                education: item.education.trim(),
                occupation: item.occupation.trim(),
                parents_background: item.parents_background.trim(),
                panel: item.panel.trim()
            })
        );
        return rows;
    }

    filterTable(filters){
        this.setState({filteredList: this.state.rows
                .filter(x => x.place.toLowerCase().includes(filters.place.toLowerCase()))
                .filter(x => x.gender.toLowerCase().includes(filters.gender.toLowerCase()))
                .filter(x => x.age.toLowerCase().includes(filters.age.toLowerCase()))
                .filter(x => x.birth.toLowerCase().includes(filters.birth.toLowerCase()))
                .filter(x => x.date_of_recording.toLowerCase().includes(filters.date_of_recording.toLowerCase()))
                .filter(x => x.education.toLowerCase().includes(filters.education.toLowerCase()))
                .filter(x => x.occupation.toLowerCase().includes(filters.occupation.toLowerCase()))
                .filter(x => x.parents_background.toLowerCase().includes(filters.parents_background.toLowerCase()))
                .filter(x => x.panel.toLowerCase().includes(filters.panel.toLowerCase()))
        });
    }

    onSearchChange(filters){
        this.filterTable(filters);
        this.setState({ searchList: filters});
    }

    onShowResultChange(id) {
        this.setState({showTextWindow: !this.state.showTextWindow, resultId: id});
    }

    render(){
        return(
            <div>
                {this.state.showTextWindow && <TextWindow onCloseClick={this.onShowResultChange} inf={this.state.resultId}/>}
                <div className="main">
                    <Search onSearchChange={this.onSearchChange} />
                    <Table rows={this.state.filteredList} onRowClick={this.onShowResultChange} searchList={this.state.searchList} />
                </div>
            </div>
        );
    }
}

export default Database;
