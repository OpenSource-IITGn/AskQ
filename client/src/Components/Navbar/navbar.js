import React, { useContext, useState } from "react";

import { Navbar, Nav, Icon, InputGroup, Input } from "rsuite";
import { NavLink, Link } from "react-router-dom";
import { useLogout } from "../../hooks/auth";

import "./navbar.css";
import { UserContext } from "../../Contexts/UserContext";
import { sucessAlert } from "../errorHandler";

function CustomNavbar(props) {
  var loggedOut = false;
  if (props.history.location.state) {
    const state = props.history.location.state;
    loggedOut = state.logout;
  }

  const { authenticated, user } = useContext(UserContext);
  const isAuthenticated = authenticated && user ? true : false;
  const [authState, setAuthState] = useState(!loggedOut && isAuthenticated);

  const logout = useLogout();

  const handleLogout = async () => {
    await logout();
    props.history.push({ pathname: "/", state: { logout: true } });

    sucessAlert("Logged out successfuly");
    setAuthState(false);
  };

  const unAuthNavItems = (
    <>
      <Nav.Item
        className="navbar-item special-btn"
        style={{ color: "#fff", height: "40px" }}
        componentClass={Link}
        to="/login"
      >
        Login
      </Nav.Item>
      <Nav.Item
        className="navbar-item"
        componentClass={Link}
        style={{ color: "#fff", height: "40px" }}
        to="/signup"
      >
        Signup
      </Nav.Item>
    </>
  );

  const authNavItems = (
    <Nav.Item
      className="navbar-item"
      componentClass={Link}
      style={{ color: "#fff", height: "40px" }}
      onClick={handleLogout}
    >
      Logout
    </Nav.Item>
  );

  return (
    <Navbar appearance="subtle">
      <Navbar.Body className="navbar">
        <Nav className="navbar-nav" pullRight>
          <Nav.Item
            className="navbar-item"
            componentClass={Link}
            style={{ color: "#fff", height: "40px" }}
            to="/about"
          >
            About
          </Nav.Item>
          {authState ? authNavItems : unAuthNavItems}
        </Nav>

        {/* <Nav className="navbar-nav" pullRight>
                    <Nav.Item onClick={handleLogout}>Log Out</Nav.Item>
                    <Nav.Item icon={<Icon icon="cog" />} componentClass={Link} to="/dashboard">Dashboard</Nav.Item>
                </Nav> */}
      </Navbar.Body>
    </Navbar>
  );
}

export default CustomNavbar;
