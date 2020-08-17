import { Navbar, Nav, Icon, InputGroup, Input } from 'rsuite';
import React from 'react'
import { NavLink } from 'react-router-dom';
import { useLogout } from './../hooks/auth';

import './../styles/navbar.css'

function CustomNavbar(props) {

    const logout = useLogout()

    const handleLogout = async () => {

        await logout();
        alert('Successfuly Logged out')
        props.history.push('/')
    }

    return (
        <Navbar appearance="subtle">
            <Navbar.Header>
            </Navbar.Header>

            <Navbar.Body className="navbar">
                <Nav className="navbar-nav">
                    <NavLink to="/" ><Nav.Item icon={<Icon icon="home" />} >Home</Nav.Item></NavLink>
                    <NavLink to="/signup"><Nav.Item>Signup</Nav.Item></NavLink>
                    <NavLink to="/login"><Nav.Item>Login</Nav.Item></NavLink>
                    <Nav.Item className="search-bar">
                        <InputGroup inside>
                            <Input />
                            <InputGroup.Button>
                                <Icon icon="search" />
                            </InputGroup.Button>
                        </InputGroup>
                    </Nav.Item>

                </Nav>

                <Nav className="navbar-nav" pullRight>
                    <Nav.Item onClick={handleLogout}>Log Out</Nav.Item>
                    <Nav.Item icon={<Icon icon="cog" />} >Settings</Nav.Item>
                </Nav>
            </Navbar.Body>
        </Navbar>

    );

}

export default CustomNavbar;