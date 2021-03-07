import React from 'react';
import Header from './Header';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Label } from 'recharts';
import { Card, Jumbotron } from 'react-bootstrap';
export default class Monitor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    componentDidMount() {
        console.log("mounted!");
        const url = 'http://api.srand.io/stats/zero-runs/24';
        fetch(url, {mode: 'cors'}).then(res=>res.json())
        .then((res)=>{
            let result = res.consecZeros.map((val, index)=>{return {consecutive: val.runLength, frequency: val.runCount}});
            this.setState({data: result});
        });
    }
    render() {
         return (
            <div>
                <br></br>
                <Jumbotron>
                    <div style={{width:"1000px",margin:'auto'}}>
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