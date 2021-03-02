import React from 'react';
import { Card } from 'react-bootstrap';
import {CircularProgressbar} from 'react-circular-progressbar';

class RandomNumberDisplay extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let string = this.props.random.toString().padStart(64, '0');
        return (
            <Card body bg='dark' text='light' style={{borderRadius: 0, height:"200px", backgroundImage: "linear-gradient(0deg, #000000, #212529)"}}>
                <Card.Title style={{borderRadius: 0,  width:"1000px", margin:"auto", fontSize:"26px", height: "100%", padding:"60px 0"}} className="text-center">
                    {string}
                </Card.Title>
            </Card>
        );
    }
}

export default RandomNumberDisplay;