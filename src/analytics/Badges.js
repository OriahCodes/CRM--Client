import React, { Component } from 'react';
import NewClients from './NewClients';
import EmailsSent from './EmailsSent';
import OutstandingClients from './OutstandingClients';
import HottestCountry from './HottestCountry';
import '../Styles/analytics.css'

class Badges extends Component {
    render() {
        return (
            <div id="badges-container">
                <NewClients />
                <EmailsSent />
                <OutstandingClients />
                <HottestCountry />
            </div>
        );
    }
}

export default Badges;