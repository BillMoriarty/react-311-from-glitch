import React from 'react';
import './App.css';
import YearChart from './yearChart';

class YearChartData extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = {
          service_name: this.props.service_name,
          yearsOfData: this.props.yearsOfData,
          YearData:[0, 0, 0, 0],
          baseURL: "https://data.phila.gov/carto/api/v2/sql?q=",
          URLextension: "SELECT count(*) as NUM FROM public_cases_fc WHERE EXTRACT(YEAR FROM requested_datetime)="
      };
    }
  
    componentWillReceiveProps(nextProps) {
        //setState with new properties;
        this.setState({service_name : nextProps.service_name})
        //call getData with the passed in data
        this.getYearDataForChart(nextProps.service_name);
    }
  
      //method to call the api and get the number.
    getYearDataForChart(service_name){

        for (var i =0; i<this.state.yearsOfData.length; i++){
            this.getData(service_name, this.state.yearsOfData[i], i);
        }
    }
  
    getData(newServiceNameToSearch, yearToSearch, arrayIndexPoint) {

        var tempString = newServiceNameToSearch;
        var stringWithoutApos = tempString.replace("'s", "''s");

        tempString = stringWithoutApos.replace('&',  ' || & || ');

        var queryURL = this.state.baseURL;

        var tempURL = this.state.URLextension
            + yearToSearch
            + " AND service_name='"
            + tempString
            + "'"
        ;

        queryURL = queryURL.concat(tempURL);

        ///beeeeeeeeautiful compact async call
        (async() => {
            try {
                var response = await fetch(queryURL);
                var data = await response.json();

                let tempArray = this.state.YearData;
                tempArray[arrayIndexPoint] = data.rows[0].num;
                this.setState({YearData: tempArray});


            } catch (e) {
                let tempArray = this.state.YearData;
                tempArray[arrayIndexPoint] = 0;
                this.setState({YearData: tempArray});

                console.log("error")
            }
        })();
    } // end getData
  

    render() {
      return <YearChart
              handleYearSelect={this.props.handleYearSelect}
              YearData={this.state.YearData}
              service_name={this.state.service_name}
              yearsOfData = {this.state.yearsOfData}
              chartColor={this.props.chartColor}
          />;
    }
  
  
} //end class

export default YearChartData;

