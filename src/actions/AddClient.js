import React, { Component } from 'react';
import '../Styles/actions.css'

class AddClient extends Component {
    constructor(){
        super()
        this.state = {
            inputVals : {
                name : "",
                surname : "",
                country : "",
                owner : "",
                email : "",
            },
            isLegit : false,
            isEmpty: {
                // email: false,
                // owner: false,
                // sold: false,
            },
        }
    }

    handleInput = (event) => {
        const category = event.target.name
        const value = event.target.value
        let {inputVals} = this.state
        inputVals[category] = value
        this.setState({inputVals})
    }

    handleRequired = () => {
        const requiredFields = ["name", "surname", "country", "owner"]
        const {inputVals} = this.state
        const {isEmpty} = this.state
        for (let field of requiredFields){
            if (inputVals[field] === ""){
                isEmpty[field] = true
            }
            else {
                isEmpty[field] = false
            }
        }
        this.setState({isEmpty})
    }

    addClient = async () => {
        this.handleRequired()
        const {inputVals} = this.state
        if (inputVals.name !== "" && inputVals.surname !== ""  && inputVals.country !== "" && inputVals.owner !== ""){
            const clientAdded = await this.props.addNewClient(inputVals)
            if (clientAdded) {
                console.log("New client added to db")
                this.setState({isLegit : true})
            }
            else {
                this.setState({isLegit : false})
                console.log("Error adding client to db")
            }
        }
        else{
            this.setState({isLegit : false})
        }
    }

    render() {
        const {inputVals, isEmpty, isLegit} = this.state
        return (
            <div id="actions-add">
                <h3>ADD CLIENT</h3>
                <div id="actions-add-container">
                    <span>First name:</span>
                        <input name="name" type="text" value={inputVals.name} onChange={this.handleInput}/>
                            {isEmpty.name ? <i className="fas fa-exclamation"></i> : <div></div>}
                    <span>Surname:</span>
                        <input name="surname" type="text" value={inputVals.surname} onChange={this.handleInput}/>
                            {isEmpty.surname ? <i className="fas fa-exclamation"></i> : <div></div>}
                    <span>Country:</span>
                        <input name="country" type="text" value={inputVals.country} onChange={this.handleInput}/>
                            {isEmpty.country ? <i className="fas fa-exclamation"></i> : <div></div>}
                    <span>Owner:</span>
                        <input name="owner" type="text" value={inputVals.owner} onChange={this.handleInput}/>
                            {isEmpty.owner ? <i className="fas fa-exclamation"></i> : <div></div>}
                    <span>Email address:</span>
                        <input name="email" type="text" value={inputVals.email} onChange={this.handleInput}/>         
                            <div></div>
                </div>
                <div id="button" onClick={this.addClient}>Add New Client</div>
                {isLegit ? <i className="fas fa-check"></i> : <></>}
            </div>
        );
    }
}

export default AddClient;