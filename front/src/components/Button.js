import React from 'react';
import div from '../Styles/Button.module.css';

class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>{this.props.text}</div>
        );
    }
}

export default Button;