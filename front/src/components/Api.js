import React from 'react';
import Header from './Header';
import {Jumbotron} from 'react-bootstrap';
import EndpointDocumentation from './EndpointDocumentation';

export default class Api extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Jumbotron style={{width:'1000px', margin:'auto', padding:'50px'}}>
                    <h1>HTTP API Reference</h1>
                    <p>
                    Endpoint: http://api.srand.io
                    </p>
                    <br></br>
                    <EndpointDocumentation endpoint="/random/{INTEGER}" 
                    description="This method returns the desired amount of random bits in 32 byte blocks."
                    titleClickHandle={()=>alert('Hello')}
                    arguments={[{name:'INTEGER', description: 'The number of 32 byte blocks of random bits desired. Must be an integer between 1 and 8.'}]}
                    ></EndpointDocumentation>
                </Jumbotron>
            </div>
            
        );
    }
}