import React from 'react'
import './Grafic.modules.css';
import { Chart } from 'react-google-charts'

export default function Grafic() {

    

  const options = {
    title: "Grafico de Pizza"
  }

  // Dados para popular o grafico
  // Lembrando que a primeira linha é parte da tabela
  const data = [
    ['Linguagens', 'Quantidade'],
    ['React', 100],
    ['Angular', 80],
    ['Vue', 50]
  ]

  return (
    <div className="App">
      <Chart
        //Tipo do grafico
        chartType="PieChart"
        data={data}
        width="100%"
        height="400px"
        options={options}
        legendToggle
      />
      <Chart
        chartType="ColumnChart"
        data={data}
        width="100%"
        height="400px"
        options={options}
      />
    </div>
  );
}