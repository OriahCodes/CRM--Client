import React, { Component } from 'react';
import Badge from './Badge';
import '../Styles/analytics.css'

class OutstandingClients extends Component {
    state = {
        iconName : "user-circle",
        data :198,
        title : "Outstanding Clients",
    }

    render() {
        const {iconName, data , title} = this.state
        return (
            <div id="outstanding-clients" className="badge-container">
                <Badge iconName={iconName} data={data} title={title}/>
            </div>
        );
    }
}

export default OutstandingClients;