import React from 'react'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const TotalData = () => {
    const { state } = useLocation();
    const { symbol_name, json_data } = state;
    const [stockData, setStockData] = useState(null);

    useEffect(() => {
        const timeSeries = json_data['Time Series (15min)'];
        const formattedData = Object.entries(timeSeries).map(([timestamp, data]) => ({
            timestamp,
            open: data['1. open'],
            high: data['2. high'],
            low: data['3. low'],
            close: data['4. close'],
            volume: data['5. volume']
        }));

        setStockData(formattedData);
    }, [])


    return (
        <div className='total-container'>
            <h2>{symbol_name} Stock Data (15 Mins)</h2>
            {stockData ? (
                <table>
                    <thead>
                        <tr>
                            <th>Timestamp</th>
                            <th>Open</th>
                            <th>High</th>
                            <th>Low</th>
                            <th>Close</th>
                            <th>Volume</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stockData.map((data, index) => (
                            <tr key={index}>
                                <td>{data.timestamp}</td>
                                <td>{data.open}</td>
                                <td>{data.high}</td>
                                <td>{data.low}</td>
                                <td>{data.close}</td>
                                <td>{data.volume}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default TotalData
