import React from 'react';
import { Navbar, Nav, Image, Container } from 'react-bootstrap';
import logo from '../logo.png';
class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">
                    <Container>
                        <Image src={logo} width='60px' height='60px'/>
                    </Container>
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/api">API</Nav.Link>
                    <Nav.Link href="/monitor">MONITOR</Nav.Link>
                    <Nav.Link href="/about">ABOUT</Nav.Link>
                </Nav>
            </Navbar>
        );
    }
}

export default Header;