import React, { Component } from 'react';

class UpdateClient extends Component {
    constructor(props){
        super(props)
        this.state={
            inputVals : {
                name : "",
                emailType : "",
                owner : "",    
                sold : true,            
            },
            messageType : null,
            messageContent : {
                enterClientName : "Please enter the client's name",
                doesntExist : "This client doesn't exist",
                emptyVal : "Please enter content"
            },
            check: {
                emailType: false,
                owner: false,
                sold: false,
            },
        }
    }

    handleCheck = (category) => {
        const {check} = this.state
        check[category] = false
        this.setState({check})
        setTimeout(() => {
            check[category] = true
            this.setState({check})
        }, 10);
    }

    handleError = (errorType) => {
        this.setState({
            messageType : errorType,
            check :  {emailType: false, owner: false, sold: false}
        })
        setTimeout(() => {
            this.setState({
                messageType : null,
            })
        }, 3000);
    }

    changeClientInfo = async (event) => {
        const category = event.target.id
        const clientName = this.state.inputVals.name
        const inputVal = this.state.inputVals[category]
        if (clientName === ""){
            this.handleError("enterClientName")
        }
        else{
            if (inputVal === ""){
                this.handleError("emptyVal")
            }
            else {
                let isLegit = await this.props.changeClientInfo(clientName, category, inputVal)
                if (isLegit){
                    this.handleCheck(category)
                    console.log("updated client", clientName)
                }  
                else{
                    this.handleError("doesntExist")
                }
            }
        }
        
    }

    handleInput = (event) => {
        const category = event.target.name
        const value = event.target.value
        let {inputVals} = this.state
        inputVals[category] = value
        this.setState({inputVals})
    }

    render() {
        const {inputVals, messageContent, messageType, check} = this.state
        const owners = Object.keys(this.props.salesByOwner)
        let capitalizedOwners = owners.map(owner => {
            let splittedOwner = owner.split(" ")
            for (let nameInd in splittedOwner){
                let name = splittedOwner[nameInd]
                let capitalized = name.charAt(0).toUpperCase() + name.slice(1)
                splittedOwner[nameInd] = capitalized
            }
            return splittedOwner.join(" ")
        })
        return (
            <div id="actions-update">
                <h3>UPDATE</h3>
                <div id="actions-update-container">

                    <span className="client-name"> Name:</span>
                        <input 
                            options={["lets","try","this"]} 
                            placeholder="Client name" 
                            className="text-input" 
                            id="update-name-input"
                            name="name" type="text" 
                            value={inputVals.name} 
                            onChange={this.handleInput}/>
                        {messageType === "doesntExist" ? <span id="doesnt-exist">{messageContent.doesntExist}</span>  : <></> }   
                        {messageType === "emptyVal" ? <span id="doesnt-exist">{messageContent.emptyVal}</span>  : <></> }   
                        {messageType === "enterClientName" ? <span id="doesnt-exist">{messageContent.enterClientName}</span>  : <></> }   
                    
                    <div id="other-updates-container">
                        <span> Send email:</span>
                            <select value={inputVals.emailType} className="text-input" name="emailType" type="text" onChange={this.handleInput}>
                                <option value="" disabled hidden>Email type</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                            </select>
                                <span className="click" id="emailType" onClick={this.changeClientInfo}>SEND</span>
                                    {check.emailType ?  <i className="fas fa-check"></i> : <div></div>}
                        <span> Tranfer ownership to:</span>
                            <input list="owners" id="owner" name="owner" className="text-input"  placeholder="Owner" value={inputVals.owner} onChange={this.handleInput}/>
                                <span className="click" id="owner" onClick={this.changeClientInfo}>TRANSFER</span>
                                    {check.owner ?  <i className="fas fa-check"></i> : <div></div>}
                        <span> Declare Sale:</span>
                            <div/>
                                <span className="click" id="sold" onClick={this.changeClientInfo}>DECLARE</span> 
                                    {check.sold ?  <i className="fas fa-check"></i> : <div></div>}
                    </div>

                    <datalist id="owners">
                        {capitalizedOwners.map(owner => 
                            <option value={owner} key={owner}/>
                        )}
                    </datalist>

                </div>
            </div>
        );
    }
}

export default UpdateClient;