import React from 'react';
import { Chart } from 'react-chartjs-2';
import './App.css';
import {Bar} from 'react-chartjs-2';

class YearChart extends React.Component {
  
  
  createChart(){
    
    var defaultText = "Choose a Service Type above"
    var dataText = "Distribution of requests related to "
                        + this.props.service_name
                        + " in all "
                        + (this.props.yearsOfData.length)
                        + " years."
                        +" Click a year below for month by month data."
    var textToUse = defaultText
    
    switch(this.props.service_name === " ") {
        case true:
            textToUse = defaultText
            break;
        case false:
            textToUse = dataText
            break;
        default:
            textToUse = dataText
    }

    return (
        <div className="yearchart">
            <Bar
                ref='chart'

                data={{
                    datasets: [{
                        data: this.props.YearData,
                        label: this.props.service_name,
                        backgroundColor: this.props.chartColor,
                    }],

                    // These labels appear in the legend and in the tooltips when hovering different arcs
                    labels: this.props.yearsOfData,
                }} redraw
                options={{
                    onClick:(evt, item) => {
                        if(item.length>0) {
                            this.props.handleYearSelect(item[0]._model.label);
                        }
                    },
                    title: {
                            display: true,
                            fontSize: 18,
                            text: textToUse
                        },
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
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

export default YearChart;