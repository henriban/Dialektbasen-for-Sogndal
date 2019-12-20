import React from 'react';
import Columns from '../../data/tableColumns';
import '../../styles/database/table.scss';

let key = 0;

class Table extends React.Component{
    constructor(props){
        super(props);
        this.onRowClicks = this.onRowClicks.bind(this);
    }
   
    generateHeaders(){
        return Columns.map(function(column) {
            return <th key={column.key} onClick={() => {this.sortTable(column.num)}}>{column.name}</th>;
        }.bind(this));
    } 
       
    sortTable(n) {

        let rows, i, x, y, shouldSwitch, dir, switchcount = 0;
        let table = this.refs.filteredTable;
        let switching = true;

        dir = "asc";

        while (switching) {

            switching = false;
            rows = table.getElementsByTagName("TR");

            for (i = 1; i < (rows.length - 1); i++) {

                shouldSwitch = false;

                x = rows[i].getElementsByTagName("TD")[n];
                y = rows[i + 1].getElementsByTagName("TD")[n];

                if (dir === "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch= true;
                        break;
                    }
                } else if (dir === "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch= true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchcount ++;
            } else {
                if (switchcount === 0 && dir === "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }

    generateRows () {
        const self = this;
        let i = 0;

        let rows = this.props.rows;

        return rows.map(function (item) {
            let cells = Columns.map(function (column) {
                return <td key={i++} >{item[column.key]}</td>;
            });
            return <tr className="row" onClick={() => {this.onRowClicks(item.id)}} key={i++}>{cells}</tr>;
        }.bind(self));
    }

    onRowClicks(id) {
        this.props.onRowClick(id); 
    }

    render(){
        let headerComponents = this.generateHeaders();
        let rowComponents = this.generateRows();

        return (
            <div className="database-table">
                <table ref="filteredTable">
                    <thead><tr>{headerComponents}</tr></thead>
                    <tbody key={key++}>{rowComponents}</tbody>
                </table>
                {rowComponents.length === 0 ? <div className="notFoundDiv"><p>Ingen resultat</p></div> : <div></div>}
            </div>
        );
    }
}

export default Table;