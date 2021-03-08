import React from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Label } from 'recharts';
import { Card, Jumbotron } from 'react-bootstrap';
import ReactSpeedometer from "react-d3-speedometer"
export default class Monitor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            percentage: 0
        };
    }
    componentDidMount() {
        const url = 'http://api.srand.io/stats/zero-runs/24';
        fetch(url, {mode: 'cors'}).then(res=>res.json())
        .then((res)=>{
            let result = res.consecZeros.map((val, index)=>{return {consecutive: val.runLength, frequency: val.runCount}});
            this.setState({data: result});
        });
        const url_1 = 'http://api.srand.io/stats/zero-percentage/24'
        fetch(url_1, {mode: 'cors'}).then(res=>res.json())
        .then((res)=>{
            this.setState({percentage: parseFloat((res.percentage * 100).toString().slice(0,5))});
        });
    }
    render() {
         return (
            <div>
                <br></br>
                <Jumbotron style={{width:"1000px",margin:'auto'}}>
                    <h5>Last 24 hours:</h5>
                    <div >
                        <h1>Percentage of Zeros</h1>
                        <div style={{width:950, height:700}}>
                        <ReactSpeedometer
                            minValue={0}
                            maxValue={100}
                            value={this.state.percentage}
                            needleColor="black"
                            segments={10}
                            segmentColors={
                                ['#FF0000',
                                '#FF7000',
                                '#FFD000',
                                '#D0FF00',
                                '#10FF00',
                                '#10FF00',
                                '#D0FF00',
                                '#FFD000',
                                '#FF7000',
                                '#FF0000']
                              }
                            fluidWidth={true}
                            />                            
                        </div>

                        <h1>Frequency of Consecutive Zeros</h1>
                        <BarChart width={950} height={700} data={this.state.data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="consecutive" >
                                <Label value="Number of consecutive zeros" offset={0} position="insideBottom" />
                            </XAxis>
                            <YAxis dataKey="frequency"/>
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="frequency" fill="#8884d8" />
                        </BarChart>                           
                    </div>
                </Jumbotron>
            </div>
          );
    }
}