import React from 'react';
import Parameters from './Parameters';
export default class EndpointDocumentation extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h4 style={{backgroundColor: '#DCDCDC', display:'inline-block', cursor: 'pointer'}} 
                onClick={this.props.titleClickHandle}>{this.props.endpoint}</h4>
                        <hr style={{margin: '2px'}}></hr>
                        <p style={{textAlign:"justify"}}>
                        {this.props.description}
                        </p>
                        <Parameters arguments={this.props.arguments}></Parameters>
                        
            </div>
        );
    }
}