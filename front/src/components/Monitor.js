import React from 'react';
import Header from './Header';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

export default class Monitor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                  "name": "Page A",
                  "uv": 4000,
                  "pv": 2400
                },
                {
                  "name": "Page B",
                  "uv": 3000,
                  "pv": 1398
                },
                {
                  "name": "Page C",
                  "uv": 2000,
                  "pv": 9800
                },
                {
                  "name": "Page D",
                  "uv": 2780,
                  "pv": 3908
                },
                {
                  "name": "Page E",
                  "uv": 1890,
                  "pv": 4800
                },
                {
                  "name": "Page F",
                  "uv": 2390,
                  "pv": 3800
                },
                {
                  "name": "Page G",
                  "uv": 3490,
                  "pv": 4300
                }
              ]
        };
    }
    componentDidMount() {
        const url = 'http://api.srand.io/stats/zero-runs/24';
        fetch(url, {mode: 'cors'}).then(res=>console.log(res))
        .then((res)=>{
            console.log(res);
        });
    }
    render() {
         return (
            <div>
                <Header ></Header>
                <div style={{width: "1000px", margin: "auto"}}>
                    <BarChart width={730} height={250} data={this.state.data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#8884d8" />
                    </BarChart>
                </div>
            </div>
          );
    }
}