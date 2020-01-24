import React, { Component } from 'react';
import {
    ResponsiveContainer, ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

class TopEmployees extends Component {
    state = {
        salesByOwner: {}
    }

    static getDerivedStateFromProps = (props, state) => {
        if (props.salesByOwner && (props.salesByOwner !== state.salesByOwner)) {
            return {
                salesByOwner: props.salesByOwner
            }
        }
        return null
    }

    render() {
        let { salesByOwner } = this.state
        let salesByOwnerObj = {}
        Object.keys(salesByOwner).forEach(owner => {
            salesByOwnerObj[owner] = salesByOwner[owner].sales
        })
        let topEmployees = Object.keys(salesByOwnerObj).sort(function (k, v) { return salesByOwnerObj[v] - salesByOwnerObj[k] })
        const topThree = topEmployees.splice(0, 3)
        let data = []
        topThree.forEach(employee => {
            data.push({ name: employee, sales: salesByOwnerObj[employee] })
        })
        console.log(data)
        return (
            <div id="top-employees">
                <div className="chart-title">
                    Top Employees
                </div>

                <div className="chart">
                    <ResponsiveContainer height={180} width="100%">
                        <ComposedChart
                            layout="vertical"
                            width={100}
                            height={100}
                            data={data}
                            margin={{
                                top: 20, right: 20, bottom: 20, left: 20,
                            }}
                        >
                            <CartesianGrid stroke="#f5f5f5" />
                            <XAxis type="number" />
                            <YAxis dataKey="name" type="category" />
                            <Tooltip />
                            <Bar dataKey="sales" barSize={10} fill="#003f5c" />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }
}

export default TopEmployees;