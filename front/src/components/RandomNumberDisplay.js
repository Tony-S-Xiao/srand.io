import React from 'react';
import { Card } from 'react-bootstrap';

class RandomNumberDisplay extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Card body bg='secondary' text='light' style={{borderRadius: 0}}>{this.props.random}</Card>
        );
    }
}

export default RandomNumberDisplay;