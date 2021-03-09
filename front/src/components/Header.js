import React from 'react';
import { Navbar, Nav, Image, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../logo.png';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Navbar bg="dark" variant="dark" style={{width:'auto'}}>
                    <Navbar.Brand>
                        <Container>
                            <Link to='/'>
                                <Image src={logo} width='60px' height='60px'/>
                            </Link>
                        </Container>
                    </Navbar.Brand>
                <Nav className="mr-auto">
                    <Link to='/api' className="nav-link">API</Link>
                    <Link to='/monitor' className="nav-link">MONITOR</Link>
                    <Link to='/about' className="nav-link">ABOUT</Link>
                </Nav>
            </Navbar>
        );
    }
}

export default Header;