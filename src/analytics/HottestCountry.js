import React, { Component } from 'react';
import Badge from './Badge';
import '../Styles/analytics.css'

class HottestCountry extends Component {
    state = {
        iconName : "globe-americas",
        data : "France",
        title : "Hottest Country",
    }

    render() {
        const {iconName, data , title} = this.state
        return (
            <div id="hottest-country" className="badge-container">
                <Badge iconName={iconName} data={data} title={title}/>
            </div>
        );
    }
}

export default HottestCountry;