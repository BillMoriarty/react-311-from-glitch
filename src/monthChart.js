import React from 'react';
import { Chart } from 'react-chartjs-2';
import './App.css';
import {Line} from 'react-chartjs-2';

class MonthChart extends React.Component {

    createChart(){
      
    var defaultText = "Choose a Year above"
    var dataText = "Distribution of requests related to "
                            + this.props.service_name
                            + " in the months of "
                            + this.props.yearToSearch
                            + "."
    var textToUse = defaultText
    
    var defaultLabel = ""
    var dataLabel = this.props.service_name + " in " + this.props.yearToSearch
    var labelToUse = defaultLabel
    
    switch(this.props.yearToSearch == 0) {
        case true:
            textToUse = defaultText
            labelToUse = defaultLabel
            break;
        case false:
            textToUse = dataText
            labelToUse = dataLabel
            break;
        default:
            textToUse = dataText
    }
      
        return (
            <div className="monthchart">
                <Line
                    ref='chart'
                    data={{
                        datasets: [{
                            data: this.props.MonthData,
                            label: labelToUse,
                            backgroundColor: this.props.chartColor,
                        }],
                        // These labels appear in the legend and in the tooltips when hovering different arcs
                        labels: this.props.monthsOfData,
                    }} redraw
                    options={{
                        title: {
                            display: true,
                            fontSize: 18,
                            text: textToUse
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        legend: {
                            title: this.props.yearToSearch,
                            display: true,
                            position: "top",
                            fullWidth: true,
                            reverse: false,
                            labels: {
                                fontColor: '#262626'
                            },
                        },
                    }}
                />
            </div>
        );
    }
  
    render() {
        return(this.createChart());
    }
} //end class

export default MonthChart;