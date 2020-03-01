import React, { Component } from 'react';
import Badge from './Badge';
import '../Styles/analytics.css'

class NewClients extends Component {
    state = {
        iconName : "chart-line",
        data : 14,
    }

    monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"]

    render() {
        const {iconName, data} = this.state
        let d = new Date()
        let currentMonth = this.monthNames[d.getMonth()]
        const title = currentMonth
        let fullTitle = `New ${title} Clients`
        return (
            <div id="new-clients" className="badge-container">
                <Badge iconName={iconName} data={data} title={fullTitle}/>
            </div>
        );
    }
}

export default NewClients;