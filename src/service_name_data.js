import React from 'react';
import { Chart } from 'react-chartjs-2';
import './App.css';
import {Doughnut, Pie} from 'react-chartjs-2';

class ServiceNameChart extends React.Component {
      constructor(props){
        super(props);
        this.state = {
            localJson:{},
            serviceNameCountNumbers:[],
            serviceNameCountNames:[],
            backgroundColors:[],
            URLextension :  " service_name, " +
                            "COUNT (service_name) " +
                            "FROM " +
                            "public_cases_fc " +
                            "GROUP BY service_name " +
                            "ORDER BY service_name " +
                            "ASC;"
             };
    }// end constructor
  
    componentWillMount(){
        this.getData();
    }
  
    getData(){
        var tempURL = this.props.baseURL + this.state.URLextension;
        ///beeeeeeeeautiful compact async call
        (async() => {
            try {
                var response = await fetch(tempURL);
                var data = await response.json();

                this.setState({localJson: data});
                this.formatDataForChart();

            } catch (e) {
                console.log("error")
            }
        })();
    } // end getData
  

    formatDataForChart(){

      if (this.state.localJson.rows.length > 0) {


          var serviceCount = [];
          var serviceNames = [];
          var backColors = [];

          //load the data into the appropriate state arrays
          for (var i = 0; i < this.state.localJson.total_rows; i++) {
              serviceNames.push(
                  this.state.localJson.rows[i].service_name
              );
              serviceCount.push(
                  this.state.localJson.rows[i].count,
              );
              backColors.push(
                this.getRandomColor()
              );
          }

          this.setState({serviceNameCountNumbers: serviceCount});
          this.setState({serviceNameCountNames: serviceNames});
          this.setState({backgroundColors: backColors});
      }
      else if(this.state.localJson.rows.length ===0) {
          var serviceCountZero = [0];
          var serviceNamesZero = ['No Requests'];


          this.setState({serviceNameCountNumbers: serviceCountZero});
          this.setState({serviceNameCountNames: serviceNamesZero});
      }//end else

  }//end formatDataForChart
  
     //this random color generator is from: https://stackoverflow.com/questions/1484506/random-color-generator
     getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    } // end getRandomColor
  
    createChart(){
        return (
            <div className="service_charts_by_year">
                <Doughnut
                    ref='chart'
                    data={{
                        datasets: [{
                            data: this.state.serviceNameCountNumbers,
                            backgroundColor: this.state.backgroundColors
                        }],

                        // These labels appear in the legend and in the tooltips when hovering different arcs
                        labels: this.state.serviceNameCountNames,
                    }}
                    options={{
                        onClick:(evt, item) => {
                            if(item.length>0) {
                                this.props.handleServiceNameSelected(item[0]._model.label, item[0]._model.backgroundColor);
                            }
                        },
                        title: {
                            display: true,
                            fontSize: 18,
                            text: "Click a service type below, then scroll down for more data."
                        },
                        legend: {
                            onClick:(evt, item) => {
                                this.props.handleServiceNameSelected(item.text, item.fillStyle);
                            },
                            display: true,
                            position: "left",
                            fullWidth: true,
                            reverse: false,
                            labels: {
                                fontColor: '#262626'
                            },
                        },
                        responsive: true,
                        maintainAspectRatio: true
                    }}

                />
            </div>
        );
    }//end createChart
    
    render() {
        return(
            this.createChart()
        );
    }
  

}   //end class
export default ServiceNameChart;