import React, { Component } from 'react';
import '../Styles/clients.css'

class ClientInfo extends Component {

    showUpdateWindow = () => {
        this.props.showUpdateWindow(this.props.client._id)
    }

    render() {
        let client = this.props.client
        let name = client.name.split(" ")[0]
        let surname = client.name.split(" ")[1]
        let firstContact = client.firstContact.split("").splice(0, 10).join("")
        let sold = client.sold
        // debugger
        let emailType = client.emailType // !== "" ? client.email.split("")[0].toUpperCase() : undefined 
        return (
            <div className="client-info" onClick={this.showUpdateWindow}>
                <div className="column-info">{name}</div>
                <div className="column-info">{surname}</div>
                <div className="column-info">{client.country}</div>
                <div className="column-info">{firstContact}</div>
                {emailType === null || emailType === "" ? 
                    <div className="column-info">-</div> :
                    <div className="column-info">{emailType}</div>            
                }
                {sold?
                    <div className="column-info"> 
                        <i className="fas fa-check"></i> 
                    </div> :
                    <div className="column-info">-</div>               
                }
                <div className="column-info">{client.owner}</div>
            </div>
        );
    }
}

export default ClientInfo;