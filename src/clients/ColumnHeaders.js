import React, { Component } from 'react';
import '../Styles/clients.css'

class ColumnHeaders extends Component {
    render() {
        const columnHeaders = this.props.columnHeaders
        return (
            <div id="column-headers">
                {columnHeaders.map(c => {
                    return (
                        <div key={c} className="column-header">{c}</div>
                    )
                })}
            </div>
        );
    }
}

export default ColumnHeaders;