import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import axios from 'axios'
import Navbar from './components/Navbar'
import Home from './home/Home'
import Clients from './clients/Clients'
import Actions from './actions/Actions'
import Analytics from './analytics/Analytics'
import './App.css';

const URL = window.location.hostname.includes("localhost") ? "http://localhost:4000/" : "https://the-amazing-crm.herokuapp.com/"
console.log(URL)

class App extends Component {
  constructor() {
    super()
    this.state = {
      clients: [],
      salesByCategory: {
        owner: [],
        emailType: [],
        country: []
      },
      salesSince: {
        data: [],
        ready: false
      },
      clientsSum: {
        data: {
          1: 0,
          6: 0,
          12: 0,
        },
        ready: false,
      }
    }
  }

  componentDidMount = () => {
    console.log("App- Mounted")
    this.getClients()
    this.getSalesByCategory("owner")
  }

  getClients = () => {
    // setTimeout(() => {
    //   let clients = require('./data/data.json')
    //   this.setState({clients})
    // }, 1000);

    axios.get(URL + 'clients')
      .then(clients => {
        console.log("App- Got Clients from db")
        this.setState({ clients: clients.data })
      })
      .catch(error => {
        console.log(error)
      })
  }

  getSalesByCategory = (category) => {
    let capitalizedCategory = category[0].toUpperCase() + category.slice(1)
    let salesByCategoryName = "salesBy" + capitalizedCategory
    axios.get(URL + 'salesBy/' + capitalizedCategory)
      .then(results => {
        console.log("App- Got " + salesByCategoryName + " from db")
        let { salesByCategory } = this.state
        salesByCategory[category] = results.data
        this.setState({ salesByCategory })
      })
      .catch(error => {
        console.log(error)
      })
  }


  pastMonths(num) {
    const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var now = new Date()
    let monthsArray = [{ month: shortMonths[now.getMonth()], year: now.getYear() + 1900 }]
    for (let i = 0; i < num; i++) {
      now.setDate(now.getDate() - 30)
      monthsArray.push({ month: shortMonths[now.getMonth()], year: now.getYear() + 1900 })
    }
    return monthsArray.reverse()
  }

  setClientsSum = (salesArray, num, ready) => {
    let { clientsSum } = this.state
    let currentClientsNum = parseInt(clientsSum.data[num], 10)
    currentClientsNum += salesArray.data.clients
    clientsSum.data[num] = currentClientsNum
    clientsSum.ready = ready
    this.setState({ clientsSum })
  }

  setSalesSince = (salesArray, num, ready) => {
    let { salesSince } = this.state
    salesSince.data.push(salesArray.data)
    salesSince.ready = ready
    this.setState({ salesSince })
  }

  getSalesSince = (num, func, status) => {
    const monthsArray = this.pastMonths(num)
    let ready
    monthsArray.forEach((date, index) => {
      if ((index === (monthsArray.length - 1)) && (status === "ready")) { ready = true }
      else { ready = false }

      let month = date.month
      let year = date.year
      axios.get(URL + `salesSince/${year}/${month}`)
        .then(results => {
          func(results, num, ready)
        })
        .catch(error => {
          console.log(error)
        })
    })
    console.log("App- Got salesSince from db")
  }

  handleMonthlySales = (num, operationType, status) => {
    let func
    if (operationType === "clientAcquisition") {
      func = this.setClientsSum
      let { clientsSum } = this.state
      clientsSum.data[num] = 0
      clientsSum.ready = false
      this.setState({ clientsSum })
      this.getSalesSince(num, func, status)
    }
    else {
      func = this.setSalesSince
      let { salesSince } = this.state
      salesSince.data = []
      salesSince.ready = false
      this.setState({ salesSince })
      this.getSalesSince(num, func, status)
    }
  }

  capitalizeWord(word) {
    if (word !== undefined) {
      return word.charAt(0).toUpperCase() + word.slice(1)
    }
    return ""
  }

  addNewClient = async (inputVals) => {
    const name = this.capitalizeWord(inputVals.name)
    const surname = this.capitalizeWord(inputVals.surname)
    const country = this.capitalizeWord(inputVals.country)
    const owner = `${this.capitalizeWord(inputVals.owner.split(" ")[0])} ${this.capitalizeWord(inputVals.owner.split(" ")[1])}`

    const managedInputVals = {
      name: `${name} ${surname}`,
      country: country,
      email: inputVals.email || "",
      owner: owner,
      sold: false,
      firstContact: new Date().toISOString().split('T')[0]
    }

    return axios.post(URL + 'client', managedInputVals)
      .then(r => {
        console.log("App- added new client to DB:", r)
        return true
      })
      .catch(e => {
        console.log(e)
        return false
      })
  }

  advancedUpdateClient = (clientName, category, inputVal) => {
    let clients = this.state.clients
    for (let c in clients) {
      if (clients[c].name.toLowerCase() === clientName.toLowerCase()) {

        let clientToUpdate = clients[c]
        let clientId = clientToUpdate._id
        let updatedVal = {}
        updatedVal[category] = inputVal
        axios.put(URL + `client/${clientId}`, updatedVal)
          .then(r => {
            console.log("App- updated Client Vals:", r)
          })
          .catch(e => console.log(e))

        //updating locally:
        clientToUpdate[category] = inputVal
        clients[c] = clientToUpdate
        this.setState({ clients })
        return true
      }
    }
    return false
  }

  updateClient = (clientId, updateVals) => {
    axios.put(URL + `client/${clientId}`, updateVals)
      .then(r => {
        console.log("App- updating Client Vals:", r)
      })
      .catch(e => console.log(e))

    //updating locally:
    let clients = this.state.clients
    for (let c in clients) {
      if (clients[c]._id === clientId) {
        let clientToUpdate = clients[c]
        let updateKeys = Object.keys(updateVals)
        for (let key of updateKeys) {
          clientToUpdate[key] = updateVals[key]
        }
        clients[c] = clientToUpdate
        this.setState({ clients })
        return
      }
    }
  }

  render() {
    let { clients, salesByCategory, salesSince, clientsSum } = this.state
    // console.log(clients)
    // console.log(salesByCategory)
    // console.log(salesSince)
    // console.log(clientsSum)

    return (
      <Router>
        <div className="App">

          <Navbar />
          <Route exact path="/" render={() =>
            <Home />} />

          <Route exact path="/clients" render={() =>
            <Clients
              clients={clients}
              updateClient={this.updateClient} />} />

          <Route exact path="/actions" render={() =>
            <Actions
              salesByOwner={salesByCategory.owner}
              changeClientInfo={this.advancedUpdateClient}
              addNewClient={this.addNewClient} />} />

          <Route exact path="/analytics" render={() =>
            <Analytics
              getSalesByCategory={this.getSalesByCategory}
              salesByCategory={salesByCategory}
              handleMonthlySales={this.handleMonthlySales}
              salesSince={salesSince}
              clientsSum={clientsSum} />} />

          <div id="footer-bar"></div>

        </div>
      </Router>
    )
  }
}

export default App;
