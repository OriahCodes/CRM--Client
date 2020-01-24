import React, { Component } from 'react';
import {
    ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip,
} from 'recharts';

const tempData= [
  {clients: 2, name: "Mar", sales: 2, year: "2019"},
  {clients: 10, name: "Apr", sales: 5, year: "2019"},
  {clients: 12, name: "May", sales: 7, year: "2019"},
  {clients: 11, name: "Jun", sales: 10, year: "2019"},
  {clients: 4, name: "Jul", sales: 3, year: "2019"},
  {clients: 2, name: "Aug", sales: 2, year: "2019"},
  {clients: 2, name: "Sep", sales: 2, year: "2019"},
  {clients: 1, name: "Oct", sales: 1, year: "2019"},
  {clients: 4, name: "Nov", sales: 3, year: "2019"},
  {clients: 10, name: "Dec", sales: 6, year: "2019"},
  {clients: 34, name: "Jan", sales: 22, year: "2020"},
]

export default class SalesSince extends Component {
  state={
    salesSince: {
      data : [],
      ready : false
    }
  }
  
  static getDerivedStateFromProps = (props, state) => {
    if (props.salesSince && (props.salesSince.ready !== state.salesSince.ready)) {
        return {
          salesSince: props.salesSince
        }
    }
    return null
  }

  // componentDidMount = () => {
  //   this.props.handleMonthlySales(11, "salesSince", "ready")
  // }

  render() {
    const {salesSince} = this.state
    let loadingState = true
    if(salesSince.data.length !== 10){loadingState = false}
    console.log(salesSince)
    let first = ""
    if(salesSince.data.length !== 0){first = {month: salesSince.data[0].name, year: salesSince.data[0].year}}
      return (
        loadingState ? 
          <div></div> : 
        <div id="sales-since">
            <div className="chart-title">
                Monthly Sales Since {first.month} {first.year}
            </div>
            
            <ResponsiveContainer height={180} width="100%">
                <LineChart
                    width={100}
                    height={100}
                    data={tempData} //{salesSince.data}
                    margin={{
                        top: 20, right: 20, bottom: 20, left: 20,
                    }}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="#ff6e54" dot={false} strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
        )    
    }
}
