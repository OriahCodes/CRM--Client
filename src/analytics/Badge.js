import React, { Component } from 'react';
import '../Styles/analytics.css'

class Badge extends Component {
    render() {
        let iconName = this.props.iconName
        let data = this.props.data
        let title = this.props.title

        return (
            <div className="badge">
                <span className="icon-container">
                    <i className={`fas fa-${iconName}`}></i>
                </span>
                <span className="data">{data}</span>
                <span className="title">{title}</span>    
            </div>
        );
    }
}

export default Badge;