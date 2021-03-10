import React from 'react';
import { Card } from 'react-bootstrap';
import {OverlayTrigger} from 'react-bootstrap';
class RandomNumberDisplay extends React.Component {
    constructor(props) {
        super(props);
    }
    copyToClipboard(string_to_copy) {
        let copy_text = document.getElementById('copy-helper');
        copy_text.type = 'text';
        copy_text.value = string_to_copy;
        copy_text.select();
        document.execCommand("copy");
        copy_text.type = 'hidden';
    };
    render() {
        let renderTooltip = <i className="fa fa-copy"></i>;
        return (
            <Card body bg='secondary' text='black' style={{borderRadius: 0, height:"200px"}}>
                <Card.Title style={{borderRadius: 0,  margin:"auto", fontSize:"26px", height: "100%", padding:"60px 0"}} className="text-center">
                    <OverlayTrigger
                        placement="right"
                        delay={{ show: 100, hide: 100 }}
                        overlay={renderTooltip}
                        containerPadding={20}
                    >
                        <div onClick={()=>{this.copyToClipboard(this.props.random)}} style={{cursor: 'pointer'}}>{this.props.random}</div>
                    </OverlayTrigger>
                </Card.Title>
            </Card>
        );
    }
}
export default RandomNumberDisplay;