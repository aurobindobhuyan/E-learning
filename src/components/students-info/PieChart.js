import React from 'react';
import { Chart } from 'react-google-charts';

const PieChart = ({ data }) => {
     const array = [["Courses", "Students per Courses"]]
     Object.keys(data).forEach(ele => {
          array.push([ele, data[ele]])
     })

     const options = {
          title: "Courses & Students",
          is3D: true,
     };

     return (
          <Chart
               width='60%'
               height='40vw'
               chartType="PieChart"
               loader={<div>Loading Chart</div>}
               data={array}
               options={options}
               rootProps={{ 'data-testid': '2' }}
          />
     );
}

export default PieChart;