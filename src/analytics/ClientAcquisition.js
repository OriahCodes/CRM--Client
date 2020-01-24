import React, { Component } from 'react';
import {
  ResponsiveContainer, PieChart, Pie, Tooltip,
} from 'recharts';

const tempData = [
  {name: "Last Month", value: 44},
  {name: "Last Six Months", value: 57},
  {name: "Last year", value: 95}]

export default class ClientAcquisition extends Component {
  state={
    clientsSum: {
      data: {
        1 : 0,
        6: 0,
        12: 0 ,
      },
      ready : false
    }
  }
  
  // componentDidMount = () => {
  //   this.handleClientAcquisition()
  // }
  
  static getDerivedStateFromProps = (props, state) => {
    if (props.clientsSum && (props.clientsSum.ready !== state.clientsSum.ready)) {
        return {
          clientsSum: props.clientsSum
        }
    }
    return null
  }

  handleClientAcquisition = () => {
    let numsArray=[12,6,1]
    numsArray.forEach(num => {
      num === 1 ?
      this.props.handleMonthlySales(num, "clientAcquisition", "ready") :
      this.props.handleMonthlySales(num, "clientAcquisition", "loading")
    })
  }

  render() {
    let {clientsSum} = this.state
    let titles = {1 : "Last Month", 6 : "Last Six Months", 12 : "Last year"}
    let data = []
    Object.keys(clientsSum.data).forEach(key => {
      data.push(({name : titles[key] , value : clientsSum.data[key]}))
    })
    // console.log(data)
    return (
      <div id="clilent-acquisition">
        <div className="chart-title">
            Client Aquisition
        </div>
        
        {/* {clientsSum.ready ?  */}
        <ResponsiveContainer height={180} width="100%">
          <PieChart art width={100} height={100}>
            <Pie 
              dataKey="value" 
              isAnimationActive={true}
              data={tempData} //data
              innerRadius={35} 
              outerRadius={50} 
              fill= "#95a5a6"
              label />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer> 
        {/* :<div></div>} */}
      </div>
    )    
  }
}
