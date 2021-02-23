import React from 'react';
import '../Styles/Header.css'
import Button from './Button';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header style={{height: this.props.height+'px'}}>
                <Button text='wow'/>
            </header>
        );
    }
}

export default Header;