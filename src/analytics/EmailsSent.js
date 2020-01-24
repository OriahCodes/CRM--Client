import React, { Component } from 'react';
import Badge from './Badge';
import '../Styles/analytics.css'

class EmailsSent extends Component {
    state = {
        iconName : "envelope",
        data : 412,
        title : "Emails Sent",
    }

    // static getDerivedStateFromProps = (props, state) => {
    //     if (props.data && (props.data !== state.data)) {
    //         return {
    //             data: props.data
    //         }
    //     }
    //     return null
    // }

    render() {
        const {iconName, data , title} = this.state
        return (
            <div id="emails-sent" className="badge-container">
                <Badge iconName={iconName} data={data} title={title}/>
            </div>
        );
    }
}

export default EmailsSent;