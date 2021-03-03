import React from 'react';
import Header from './Header';
import RandomNumberDisplay from './RandomNumberDisplay';

class Homepage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div> 
                <Header style={{position:'fixed'}}/>
                <RandomNumberDisplay random={this.props.random}></RandomNumberDisplay>
            </div>
        );
    }
}

export default Homepage;