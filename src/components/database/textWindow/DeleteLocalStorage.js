import React from 'react'

import '../../../styles/database/deleteLocalStorage.scss'

class DeleteLocalStorage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showDeleteLocalStorage: false
        };
    }

    onDeleteClick(){
        this.setState({
            showDeleteLocalStorage: !this.state.showDeleteLocalStorage
        })
    }

    deleteAllLocalStorage(){
        if(window.confirm("Er du sikker på at du ønskjer å tilbakestilla?")){
            localStorage.clear()
        }
        this.resetLocalStorage()
        this.closeDeleteLocalStorage()
    }

    deleteInformersLocalStorage(){
        if(this.props.inf2 !== undefined){
            if(window.confirm("Er du sikker på at du ønskjer å tilbakestilla informant " + this.props.inf1.id + " og " + this.props.inf2.id + "?")){
                window.localStorage.removeItem(this.props.inf1.id)
                window.localStorage.removeItem(this.props.inf2.id)
            }
        } else {
            if(window.confirm("Er du sikker på at du ønskjer å tilbakestilla informant " + this.props.inf1.id + "?")){
                window.localStorage.removeItem(this.props.inf1.id)
            }
        }

        this.resetLocalStorage()
        this.closeDeleteLocalStorage()
    }

    resetLocalStorage(){
        if(this.props.inf2 !== undefined){
            localStorage.setItem(this.props.inf2.id, JSON.stringify([]));
        }
        
        localStorage.setItem(this.props.inf1.id, JSON.stringify([]));        
    }

    closeDeleteLocalStorage(){
        this.setState({
            showDeleteLocalStorage: false
        })
    }

    generateDeleteInformersText(){
        if(this.props.inf2 === undefined){
            return <span>Tilbakestill {this.props.inf1.id}</span>
        }
        return <span>Tilbakestill {this.props.inf1.id} og {this.props.inf2.id}</span>
    }

    render(){
        return(
            <div className="deleteLocalStorageWrapper">
                <button className="deleteButton" onClick={this.onDeleteClick.bind(this)}><img src="./delete.svg" alt="#"/></button>
                { this.state.showDeleteLocalStorage && 
                    <div className="deleteLocalStorage">
                        <button onClick={() => this.deleteAllLocalStorage()}>Tilbakestill alle</button>
                        <button onClick={() => this.deleteInformersLocalStorage()}>{this.generateDeleteInformersText()}</button>
                    </div>}
            </div>
        )
    }
}

export default DeleteLocalStorage