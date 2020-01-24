import React, { Component } from 'react';

class UpdateClient extends Component {

    constructor(){
        super()
        this.state={
            inputVals : {
                country: "",
                emailType : "",
                owner : "",
                sold :  null ,
            },
            checkedVals : {
                yes : false,
                no : false
            }
        }
    }

    updateClient = () => {
        let inputVals = this.state.inputVals
        this.props.updateClient(inputVals)
    }

    handleInput = (event) => {
        let inputType = event.target.name
        let inputVals =this.state.inputVals
        inputVals[inputType] = event.target.value
        this.setState({inputVals})
    }


    handleCheckbox= (event) => {
        let name = event.target.name
        let checked = event.target.checked
        let checkedVals = this.state.checkedVals
        let inputVals = this.state.inputVals
        if (name === "yes"){
            checkedVals = {yes: checked, no : !checked } 
            inputVals.sold = true
        } 
        else {
            checkedVals = {yes: !checked, no : checked }
            inputVals.sold = false
        }
        this.setState({checkedVals : checkedVals, inputVals : inputVals})
    }

    componentDidMount = () => {
        let client = this.props.client
        let inputVals = this.state.inputVals
        let inputKeys = Object.keys(inputVals)
        for (let key of inputKeys){
            inputVals[key] = client[key]
        }
        this.setState({inputVals})
    }

    render() {
        let client = this.props.client
        let {inputVals , checkedVals} = this.state

        return (
            <div id="update-client-container">
                <button className="close-update" onClick={this.props.hideUpdateWindow}>X</button>
                <div id="client-name"> {client.name} </div>
                <div id="update-client">
                    <span> Country:</span>
                        <input className="text-input" name="country" type="text" value={inputVals.country} onChange={this.handleInput}/>
                    <span> emailType:</span>
                        <input className="text-input" name="emailType" type="text" value={inputVals.emailType} onChange={this.handleInput}/>
                    <span> Owner:</span>
                        <input className="text-input" name="owner" type="text" value={inputVals.owner} onChange={this.handleInput}/>
                    <span> Sold:</span>
                        <div id="radio-update-input">
                            <input className="radio-update-input" name="yes" type="radio" checked={checkedVals.yes} onChange={this.handleCheckbox}/>
                                <span>Yes</span>
                            <input className="radio-update-input" name="no" type="radio" checked={checkedVals.no} onChange={this.handleCheckbox}/>
                                <span>No</span>
                        </div>               
                </div>
                <div className="update-button" onClick={this.updateClient}> Update</div>
            </div>
            );
    }
}

export default UpdateClient;