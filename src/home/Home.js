import React, { Component } from 'react';
import '../Styles/home.css'

class Home extends Component {
    render() {
        return (
            <div id="home-label">
               <div>
                   <span id="c">C</span>
                   <span id="r">R</span>
                   <span id="m">M</span>
                </div> 
               <span> CUSTOMER RELATIONSHIP MANAGEMENT</span>
            </div>
        );
    }
}

export default Home;