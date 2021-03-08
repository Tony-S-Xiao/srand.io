import React from 'react';
import { Card } from 'react-bootstrap';

class RandomNumberDisplay extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Card body bg='dark' text='light' style={{borderRadius: 0, height:"200px", backgroundImage: "linear-gradient(0deg, #000000, #212529)"}}>
                <Card.Title style={{borderRadius: 0,  width:"1000px", margin:"auto", fontSize:"26px", height: "100%", padding:"60px 0"}} className="text-center">
                    {this.props.random}
                </Card.Title>
            </Card>
        );
    }
}

export default RandomNumberDisplay;