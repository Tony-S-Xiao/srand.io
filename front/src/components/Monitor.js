import React from 'react';
import Header from './Header';

export default class Monitor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    render() {
        return (
            <Header />
        );
    }
}