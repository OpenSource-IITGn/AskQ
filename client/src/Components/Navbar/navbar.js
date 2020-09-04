import { Navbar, Nav, Icon, InputGroup, Input } from 'rsuite';
import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import { useLogout } from '../../hooks/auth';

import './navbar.css'

function CustomNavbar(props) {

    const logout = useLogout()

    const handleLogout = async () => {

        await logout();
        alert('Successfuly Logged out')
        props.history.push('/')
    }

    return (
        <Navbar appearance="subtle">

            <Navbar.Body className="navbar">
                <Nav className="navbar-nav" pullRight>
                    <Nav.Item className="navbar-item" componentClass={Link} style={{ color: "#fff", height: "40px" }} to="/" >About</Nav.Item>
                    <Nav.Item className="navbar-item special-btn" style={{ color: "#fff", height: "40px" }} componentClass={Link} to="/login">Login</Nav.Item>
                    <Nav.Item className="navbar-item" componentClass={Link} style={{ color: "#fff", height: "40px" }} to="/signup">Signup</Nav.Item>
                </Nav >

                {/* <Nav className="navbar-nav" pullRight>
                    <Nav.Item onClick={handleLogout}>Log Out</Nav.Item>
                    <Nav.Item icon={<Icon icon="cog" />} componentClass={Link} to="/dashboard">Dashboard</Nav.Item>
                </Nav> */}
            </Navbar.Body >
        </Navbar >

    );

}

export default CustomNavbar;