import React, { useState, useEffect } from 'react';
import { CandlestickChart } from './CandleStickChart';
import { useNavigate } from 'react-router-dom';
import './Card.css';
import axios from 'axios';

const Card = ({ symbol }) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const [stockdata, setstockdata] = useState(null);
    const [latestData, setlatestData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=15min&apikey=${apiKey}`)
            .then((response) => {
                const data = response.data;
                console.log(data);
                setstockdata(data);
                setlatestData(getLatestValues(data));
            }).catch((e) => {
                console.log(e);
            });  
    }, []);

    const getLatestValues = (data) => {
        const latestTimestamp = Object.keys(data['Time Series (15min)']).reduce((a, b) => new Date(a) > new Date(b) ? a : b);
        const latestData = data['Time Series (15min)'][latestTimestamp];
        return [
            latestData['1. open'],
            latestData['2. high'],
            latestData['3. low'],
            latestData['4. close'],
            latestData['5. volume']
        ];
    }

    const handleButton = () => {
        navigate('total/', { state: { symbol_name: symbol, json_data: stockdata } });
    }

    return (
        <div className="card-container">
            <h3>{symbol}</h3>
            <div className='details'>
                <div className="chart-container">
                    {stockdata && <CandlestickChart data={stockdata} />}
                </div>

                <div className="data-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Open</th>
                                <th>High</th>
                                <th>Low</th>
                                <th>Close</th>
                                <th>Volume</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {latestData.map((item, index) => <td key={index}>{item}</td>)}
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <button onClick={handleButton}>View Last 15 minutes data</button>
                </div>

            </div>
        </div>
    );
}

export default Card;
