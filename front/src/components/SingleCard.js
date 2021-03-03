import React from 'react';
import { Card } from 'react-bootstrap';

export default class SingleCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card text='dark' bg='light' style={{width:"900px", height: this.props.height,
             borderRadius:10, margin:'auto', marginTop: 10, marginBottom: 10}}>
                 <Card.Body style={{margin:'auto', width:'600px'}}>
                    <Card.Title style={{height: '70px', fontSize: this.props.titleFontSize}}>
                        {this.props.title}
                    </Card.Title>
                    <Card.Text>
                        {this.props.children}
                    </Card.Text>
                 </Card.Body>
            </Card>
        );
    }
}