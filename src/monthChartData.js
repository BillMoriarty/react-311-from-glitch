import React from 'react';
import './App.css';
import MonthChart from './monthChart';

class MonthChartData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            service_name: this.props.service_name,
            monthsOfData: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            MonthData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            baseURL: "https://data.phila.gov/carto/api/v2/sql?q=",
            URLextension: "SELECT count(*) as NUM FROM public_cases_fc WHERE EXTRACT(MONTH FROM requested_datetime)="
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({service_name : nextProps.service_name});
      
        //call getData with the passed in data
        this.getMonthDataForChart(nextProps.service_name, nextProps.yearToSearch);
    }

    //method to call the api and get the number.
    getMonthDataForChart(service_name, yearToSearch){
        //query 12 times, one for each month
        if(yearToSearch>0){
            for (var i =1; i<=12; i++){
                this.getData(service_name, i, yearToSearch);
            }
        }
        else {
            //reset the array to draw 0
            var tempArray=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.setState({MonthData: tempArray});
        }
    }

    getData(newServiceNameToSearch, monthNumberToSearch, yearToSearch) {

        var tempString = newServiceNameToSearch;
        var stringWithoutApos = tempString.replace("'s", "''s");
        tempString = stringWithoutApos.replace('&',  ' || & || ');
        var queryURL = this.state.baseURL; //todo fix this with new query
        
        var tempURL = this.state.URLextension
            + monthNumberToSearch
            + "AND EXTRACT(YEAR FROM requested_datetime)="
            + yearToSearch
            + "AND service_name='"
            + tempString
            + "'"
            ;
        queryURL = queryURL.concat(tempURL);

        ///beeeeeeeeautiful compact async call
        (async() => {
            try {
                var response = await fetch(queryURL);
                var data = await response.json();
                let tempArray = this.state.MonthData;
                tempArray[monthNumberToSearch-1] = data.rows[0].num;
                this.setState({MonthData: tempArray});
            } catch (e) {
                let tempArray = this.state.MonthData;
                tempArray[monthNumberToSearch-1] = 0;
                this.setState({MonthData: tempArray});
                console.log("error")
            }
        })();
    } // end getData

    render() {
        return <MonthChart
            MonthData={this.state.MonthData}
            service_name={this.state.service_name}
            monthsOfData = {this.state.monthsOfData}
            chartColor = {this.props.chartColor}
            yearToSearch = {this.props.yearToSearch}
            />;
    }
} //end class

export default MonthChartData;