import React, { Component } from 'react';
import ClientInfo from '../clients/ClientInfo'
import ColumnHeaders from './ColumnHeaders'
import UpdateClient from './UpdateClient'
import SearchBar from './SearchBar'
import Loader from './Loader'
import ActivePage from './ActivePage'
import '../Styles/clients.css'

class Clients extends Component {
    constructor() {
        super()
        this.state = {
            clients: [],
            filteredClients: [],
            clientsToDisplay: [],
            itemsPerPage: 30,
            currentPage: 1,
            numOfPages: null,
            searchVal: "",
            searchCategory: "name",
            soldVal: null,
            showUpdateWindow: false,
            clientToUpdate: "",
            columnHeaders: ["Name", "Surname", "Country", "First Contact", "Email Type", "Sold", "Owner"],
        }
    }

    pageBack = () => {
        let currentPage = this.state.currentPage
        if (currentPage > 1) {
            this.setState({ currentPage: this.state.currentPage - 1 }, () => {
                this.clientsToDisplay()
            })
        }
    }

    pageForward = () => {
        const { currentPage, numOfPages } = this.state
        if (currentPage < numOfPages) {
            this.setState({ currentPage: this.state.currentPage + 1 }, () => {
                this.clientsToDisplay()
            })
        }
    }

    showUpdateWindow = (clientId) => {
        this.setState({
            showUpdateWindow: true,
            clientToUpdate: clientId
        })
    }

    hideUpdateWindow = () => {
        this.setState({ showUpdateWindow: false })
    }

    updateClient = (updateVals) => {
        const { clientToUpdate } = this.state
        this.props.updateClient(clientToUpdate, updateVals)
        this.setState({ showUpdateWindow: false })
    }

    handleSearchVals = (searchVal) => {
        this.setState({ searchVal }, () => {
            this.getFilteredClients()
        })
    }

    handleSelect = (searchCategory) => {
        this.setState({ searchCategory }, () => {
            this.getFilteredClients()
        })
    }

    handleSold = (soldVal) => {
        this.setState({ soldVal }, () => {
            this.getFilteredClients()
        })
    }

    clientsToDisplay = () => {
        const { filteredClients, currentPage, itemsPerPage } = this.state
        const amountOfClients = filteredClients.length
        const startAt = (currentPage - 1) * itemsPerPage

        let numOfPages = Math.ceil(amountOfClients / itemsPerPage)
        this.setState({ numOfPages })
        let clientsToDisplay = filteredClients.slice(startAt, currentPage * itemsPerPage)
        this.setState({ clientsToDisplay })
    }

    getFilteredClients = () => {
        console.log("getting filtered clients")
        let { clients, searchCategory, searchVal, soldVal } = this.state
        if (searchVal === null) { searchVal = "" }

        let filteredClients = []  //search filter
        clients.forEach(client => {
            if (client[searchCategory] === null) { client[searchCategory] = "" }
            if (soldVal !== null) {
                if (client[searchCategory].toLowerCase().includes(searchVal.toLowerCase()) && client.sold === soldVal) { filteredClients.push(client) }
            }
            else {
                if (client[searchCategory].toLowerCase().includes(searchVal.toLowerCase())) { filteredClients.push(client) }
            }
        })

        this.setState({ filteredClients }, () => {
            this.clientsToDisplay()
        })
    }

    componentWillReceiveProps(nextProps) {
        console.log('Clients - recieved props')
        this.setState({ clients: nextProps.clients }, () => {
            this.getFilteredClients()
        })
    }

    componentDidMount = () => {
        console.log("Clients - Mounted")
        this.setState({ clients: this.props.clients }, () => {
            this.getFilteredClients()
        })
    }

    render() {

        let { clients, filteredClients, clientsToDisplay } = this.state
        // console.log(filteredClients)
        // console.log(clientsToDisplay)

        //manage updateClient
        let { showUpdateWindow, clientToUpdate } = this.state
        let client = {}
        if (clientToUpdate) {
            client = filteredClients.filter(c => c._id === clientToUpdate)[0]
        }

        return (
            clients.length === 0 ?
                <Loader /> :

                <div id="clients-page">

                    <SearchBar
                        handleSearchVals={this.handleSearchVals}
                        handleSelect={this.handleSelect}
                        handleSold={this.handleSold} />

                    <ActivePage
                        currentPage={this.state.currentPage}
                        numOfPages={this.state.numOfPages}
                        pageBack={this.pageBack}
                        pageForward={this.pageForward} />

                    <div id="clients-table">
                        <ColumnHeaders columnHeaders={this.state.columnHeaders} />

                        <div id="clients-rows">
                            {clientsToDisplay.map(c => {
                                return (
                                    <ClientInfo
                                        key={c._id}
                                        client={c}
                                        showUpdateWindow={this.showUpdateWindow} />
                                )
                            })}
                        </div>
                    </div>

                    {showUpdateWindow ?
                        <UpdateClient
                            client={client}
                            hideUpdateWindow={this.hideUpdateWindow}
                            updateClient={this.updateClient} /> : <></>
                    }

                </div>
        );
    }
}

export default Clients;