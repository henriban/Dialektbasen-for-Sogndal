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
        if(window.confirm("Er du sikker på at du ønsker å tilbakestill?")){
            localStorage.clear()
        }
        this.closeDeleteLocalStorage()
    }

    deleteInformersLocalStorage(){
        if(window.confirm("Er du sikker på at du ønsker å tilbakestill?")){
            console.log("This")
            window.localStorage.removeItem(this.props.inf1)
            if(this.props.inf2 !== undefined)
            window.localStorage.removeItem(this.props.inf2)
        }
        this.closeDeleteLocalStorage()
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
                { this.state.showDeleteLocalStorage && 
                    <div className="deleteLocalStorage">
                        <button onClick={() => this.deleteAllLocalStorage()}>Tilbakestill alle</button>
                        <button onClick={() => this.deleteInformersLocalStorage()}>{this.generateDeleteInformersText()}</button>
                    </div>}
                <button className="deleteButton" onClick={this.onDeleteClick.bind(this)}><img src="./delete.svg" alt="#"/></button>
            </div>
        )
    }
}

export default DeleteLocalStorage