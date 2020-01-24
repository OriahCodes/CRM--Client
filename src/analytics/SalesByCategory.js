import React, { Component } from 'react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip,
} from 'recharts'

export default class SalesByCategory extends Component {
    state = {
      salesByCategory : {
        owner : [],
        emailType : [],
        country : []
      },
      categoryInput : "owner"
    }

    getSalesByCategory = () => {
      const {salesByCategory, categoryInput} = this.state
      if(salesByCategory[categoryInput].length === 0){
        this.props.getSalesByCategory(categoryInput)
      }
    }

    handleInput = (event) => {
      const value = event.target.value
      let {categoryInput} = this.state
      categoryInput= value
      this.setState({categoryInput}, () => {
        this.getSalesByCategory()
      })
    }

    static getDerivedStateFromProps = (props, state) => {
        if (props.salesByCategory && (props.salesByCategory !== state.salesByCategory)) {
            return {
              salesByCategory: props.salesByCategory
            }
        }
        return null
    }

  render() {
    let {salesByCategory, categoryInput} = this.state
    // console.log(salesByCategory)

    let data = []
    let salesInfo = salesByCategory[categoryInput]

    let isEmpty = !Object.keys(salesInfo).length 
    if(!isEmpty){
      const categoryNames = Object.keys(salesInfo)
      for(let name of categoryNames){
        data.push(salesInfo[name])
      }
      // console.log(data)  
    }

    let categories = Object.keys(salesByCategory)

    return (
      <div id="sales-by-category">

        <div id="choose-category">
          <span>Sales by</span>
          <select value={categoryInput} onChange={this.handleInput} id="category" className="category-choice" type="text" >
            {categories.map(c => 
              <option value={c} key={c}>{c}</option>
            )}
          </select>
        </div>

        <div className="chart">
          <ResponsiveContainer height={180} width="100%">
            <BarChart 
              width = {100}
              height={100} 
              data={data}
              margin={{
                top: 20, right: 20, bottom: 20, left: 20,
                }}
            >
              <XAxis dataKey="name" />
              <YAxis/>
              <Tooltip />
              <Bar dataKey="sales" stackId="a" fill="#8884d8" />
              <Bar dataKey="clients" stackId="a" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    )
  }
}
