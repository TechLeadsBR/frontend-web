import React from 'react'
import { Chart } from 'react-google-charts'
import Stylecss from './grafic.module.css'

export default function Grafic({ data }) {

  return (
    <div className={Stylecss.App}>
      <Chart className={Stylecss.Chart}
        options={{ colors: ["#BE0024"] }}
        chartType="ColumnChart"
        data={data}
        width="100%"
        height="400px"
      />
    </div>
  );
}