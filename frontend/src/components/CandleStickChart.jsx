import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { enGB, enUS } from 'date-fns/locale';
import { Chart, LinearScale, PointElement, Tooltip, Legend, TimeScale } from "chart.js";

import { OhlcElement, OhlcController, CandlestickElement, CandlestickController } from 'chartjs-chart-financial'

Chart.register(OhlcElement, OhlcController);
Chart.register(CandlestickElement, CandlestickController);
Chart.register(LinearScale, PointElement, Tooltip, Legend, TimeScale);

const CandlestickChart = ({ data }) => {
  // Extracting data from JSON
  const labels = Object.keys(data['Time Series (15min)']);

  const candleData = labels.map(label => {
    const candle = data['Time Series (15min)'][label];
    return {
      t: new Date(label),
      o: parseFloat(candle['1. open']),
      h: parseFloat(candle['2. high']),
      l: parseFloat(candle['3. low']),
      c: parseFloat(candle['4. close'])
    };
  });

  // Creating dataset for candlestick chart
  const dataset = {
    datasets: [{
      label: 'Candlestick Chart',
      data: candleData,
      type: 'candlestick',
      borderColor: 'black',
      backgroundColor: 'rgba(0,0,0,0)',
      borderWidth: 1,
    }]
  };

  // Chart options
  const options = {
    scales: {
      x: {
        type: 'time',
        adapters: {
          date: {
            locale: enGB,
          },
        },
        time: {
          unit: 'second' // Adjust as needed
        }
      }
    }
  };

  return (
    <>
      <div>
        <Line data={dataset} options={options} />
      </div>
    </>

  );
};

export { CandlestickChart };

