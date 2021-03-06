import React from 'react';

export default class Parameters extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <b style={{margin:"20px"}}>Parameters</b>
                {
                    this.props.arguments.map((val)=>{
                        return (
                        <div style={{margin:"20px"}}>
                            <p style={{display:'inline-block', width: "33%", verticalAlign:"top"}}>{val.name}</p>
                            <p style={{display:'inline-block',  width: "67%", textAlign:'left'}}>{val.description}</p>
                        </div>
                        );
                    })
                }
            </div>
        );
    }
}