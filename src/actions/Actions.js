import React, { Component } from 'react';
import UpdateClient from './UpdateClient'
import AddClient from './AddClient'
import '../Styles/actions.css'

class Actions extends Component {
    constructor(props){
        super(props)
        this.state = {
            salesByOwner : props.salesByOwner
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('Actions - recieved props:' ,nextProps.salesByOwner)
        this.setState({salesByOwner : nextProps.salesByOwner})
    }

    render() {
        let {salesByOwner} = this.state
        console.log(salesByOwner)
        return (
            <div id="actions-page">
                <UpdateClient
                    salesByOwner={salesByOwner}
                    changeClientInfo={this.props.changeClientInfo} />
                <hr />
                <AddClient 
                    addNewClient={this.props.addNewClient}/>
            </div>
        );
    }
}

export default Actions;