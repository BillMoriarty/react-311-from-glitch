import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ServiceNameChart from './service_name_data';
import YearChartData from './yearChartData';
import MonthChartData from './monthChartData';


class App extends Component {
  
  constructor(){
    super();
    this.state= {
      yearsOfData: [2014, 2015, 2016, 2017],
      yearToSearch: 0,
      service_name: " ",
      chartColor: "",
      yearToDisplay: 2014,
      baseURL: "https://data.phila.gov/carto/api/v2/sql?q=SELECT",
      totalRequests: 0
    };
    this.handleServiceNameSelected = this.handleServiceNameSelected.bind(this);
    this.handleYearSelect = this.handleYearSelect.bind(this);
  }
  
  handleYearSelect(item) {
      this.setState({yearToSearch: item});
  }
  
  handleServiceNameSelected(item, itemColor) {
      this.setState({service_name: item});
      this.setState({chartColor: itemColor});
  }
  
  componentDidMount(){
   var tempURL = this.state.baseURL + " count(*) as NUM FROM public_cases_fc";
   (async() => {
   try {
   var response = await fetch(tempURL);
   var data = await response.json();

    this.setState({totalRequests: data.rows[0].num});
     } catch (e) {
       console.log("error")
       }
     })();
   }
    
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h3>React App + Philly 311</h3>
        </div>
      
      <div className="agencyselect">
         <h1>Philly 311 has handled {this.state.totalRequests} requests since {this.state.yearToDisplay}. </h1>       
      </div>      
      
      <ServiceNameChart
          baseURL={this.state.baseURL}
          handleServiceNameSelected={this.handleServiceNameSelected}
      />
      
      <YearChartData
          service_name={this.state.service_name}
          yearsOfData={this.state.yearsOfData}
          handleYearSelect={this.handleYearSelect}
          chartColor={this.state.chartColor}
      />
      
      <MonthChartData
          service_name={this.state.service_name}
          yearToSearch={this.state.yearToSearch}
          chartColor={this.state.chartColor}
      />

      </div>
      
    );
  }
}

export default App;
