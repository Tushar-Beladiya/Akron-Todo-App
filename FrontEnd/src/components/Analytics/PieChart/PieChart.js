import React from "react";

import Chart from "react-apexcharts";

class ApexChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          
            series: [],
            options: {
              chart: {
                width: 380,
                type: 'pie',
              },
              labels: [],
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            },
          
          
          };
    }

    updateStates() {
      console.log("Pie - Data | ",this.props.data)
      let series =this.props.data.series||[];
      let options = { ...this.state.options };
      let labels =this.props.data.labels||[];
  
      this.setState({ series });
  
      options.labels = labels;
      this.setState({ options });
    }
  
    componentDidMount() {
      this.updateStates();
    }

    componentWillReceiveProps() {
      this.updateStates();
    }
  
    render() {
        return (
            <Chart
                options={this.state.options}
                series={this.state.series}
                width="380"
                type="pie"
            />
        );
    }
}

export default ApexChart;
