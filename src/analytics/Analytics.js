import React, { Component } from 'react';
import Charts from './Charts'
import Badges from './Badges'
import '../Styles/analytics.css'

class Analytics extends Component {
    render() {
        return (
            <div>
                <Badges />
                <Charts 
                    salesByCategory={this.props.salesByCategory}
                    getSalesByCategory={this.props.getSalesByCategory}
                    handleMonthlySales={this.props.handleMonthlySales}
                    salesSince={this.props.salesSince}
                    clientsSum={this.props.clientsSum}/>
            </div>
        );
    }
}

export default Analytics;