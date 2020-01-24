import React, { Component } from 'react';
import '../Styles/clients.css'

class SearchBar extends Component {
    constructor(){
        super()
        this.state = {
            columnHeaders : [
                {value : "name", label:"Name"}, 
                {value: "country", label: "country"}, 
                {value: "emailType", label: "Email Type"}, 
                {value: "owner", label: "Owner"},
            ],
            searchCategory : { value: "name", label: "Name"},
            searchValue : "",
        }
    }

    handleSearchVals = (event) => {
        let searchValue = event.target.value
        this.setState({searchValue}, () => {
            this.props.handleSearchVals(searchValue)
        })
    }

    handleSold = (event) => {
        let soldVal = event.target.value
        soldVal === "yes" ? soldVal = true : soldVal = false
        this.props.handleSold(soldVal)
    }

    handleSelect = (event) => {
        let searchCategory = {
            label : event.target.label,
            value : event.target.value,
        }
        this.setState({searchCategory}, () => {
            this.props.handleSelect(searchCategory.value)
        })
    }

    render() {
        let columnHeaders = this.state.columnHeaders
        let searchCategory = this.state.searchCategory
        return (
            <div id="search-container">
                <input 
                    id="search-input"
                    type="Text"
                    placeholder="Search" 
                    value={this.state.searchValue} 
                    onChange={this.handleSearchVals}>
                </input>
                <select id="select" onChange={this.handleSelect} label={searchCategory.label} value={searchCategory.value}>
                    {columnHeaders.map(option => {
                        return(
                            <option value={option.value} key={option.label}>{option.label}</option>
                        )
                    })}
                </select>
                <span id="check-sold">
                    <span id="label" >Sold:</span>
                    <input type="radio" name="sold" value="yes" onChange={this.handleSold}/><span>Yes</span>
                    <input type="radio" name="sold" value="no" onChange={this.handleSold}/><span>No</span>
                </span>
            </div>

        );
    }
}

export default SearchBar;