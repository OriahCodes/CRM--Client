import React, { Component } from 'react';
import SalesByCategory from './SalesByCategory'
import TopEmployees from './TopEmployees'
import SalesSince from './SalesSince'
import ClientAcquisition from './ClientAcquisition'
import '../Styles/analytics.css'

class Charts extends Component {
    render() {
        return (
            <div id="charts-container">
                <div id="charts-container1">
                    <TopEmployees 
                        salesByOwner={this.props.salesByCategory.owner}/>
                    <SalesByCategory 
                        salesByCategory={this.props.salesByCategory}
                        getSalesByCategory={this.props.getSalesByCategory}/>      
                </div>
                <div id="charts-container2">
                    <SalesSince 
                        handleMonthlySales={this.props.handleMonthlySales}
                        salesSince={this.props.salesSince}/>
                    <ClientAcquisition 
                        handleMonthlySales={this.props.handleMonthlySales}
                        clientsSum={this.props.clientsSum}/>
                </div>
            </div>
        )
    }
}

export default Charts;