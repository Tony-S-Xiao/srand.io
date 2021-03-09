import React from 'react';
import Parameters from './Parameters';
import {OverlayTrigger} from 'react-bootstrap';
export default class EndpointDocumentation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let renderTooltip = <div><i className="fa fa-copy" style={{padding:5}}></i></div>;
        return (
            <div>
                <OverlayTrigger
                    placement="right"
                    delay={{ show: 100, hide: 100 }}
                    overlay={renderTooltip}
                    containerPadding={20}
                >
                    <h4 style={{backgroundColor: '#DCDCDC', display:'inline-block', cursor: 'pointer'}} 
                onClick={()=>{this.props.titleClickHandle("http://api.srand.io" + this.props.endpoint)}}>{this.props.endpoint}</h4>
                </OverlayTrigger>

                        <hr style={{margin: '2px'}}></hr>
                        <p style={{textAlign:"justify"}}>
                        {this.props.description}
                        </p>
                        <Parameters arguments={this.props.arguments}></Parameters>
                        
            </div>
        );
    }
}