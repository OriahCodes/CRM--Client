import React, { Component } from 'react';
import '../Styles/clients.css'

class ActivePage extends Component {
    pageBack = () => {
        console.log("Go back")
        this.props.pageBack()
    }

    pageForward = () => {
        console.log("Go forward")
        this.props.pageForward()
    } 

    render() {
        let currentPage = this.props.currentPage
        let numOfPages = this.props.numOfPages
        return (
            <div id="page-manager">
                <i className="fas fa-caret-left" id="arrow" onClick={this.pageBack}></i>
                    <span> {currentPage} - {numOfPages} </span>
                <i className="fas fa-caret-right" id="arrow" onClick={this.pageForward}></i>
            </div>
        );
    }
}

export default ActivePage;