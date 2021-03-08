import React from 'react';
import { Card } from 'react-bootstrap';

export default class CodeExample extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{width: this.props.width}}>
                <Card bg="dark" text="info">
                    <Card.Body>
                        {this.props.children}
                    </Card.Body>
                </Card>
            </div>
        );
    }

}