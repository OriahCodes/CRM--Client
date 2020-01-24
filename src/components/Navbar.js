import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import '../Styles/navbar.css'

class Navbar extends Component {
    render() {
        return (
            <div id="navbar">
                <Link to="/">Home</Link>
                <Link to="/Clients">Clients</Link>
                <Link to="/Actions">Actions</Link>
                <Link to="/Analytics">Analytics</Link>
            </div>
        );
    }
}

export default Navbar;