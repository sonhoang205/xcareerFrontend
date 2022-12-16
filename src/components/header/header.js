import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Example from "../header/profile-modal";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {dologout} from "../../redux/action/userAction"
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [login, setLogin] = useState(false);

  const [profile, setProfile] = useState();

  const islogin = useSelector((state) => state.user.islogin);
  const account = useSelector((state) => state.user.account);
  const handleShowProfile = (username) => {
    setShow(!show);
    setProfile(account);
  };

  const handleLogin = () => {
    navigate("/Login");
  };
  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogout =()=>{
    localStorage.removeItem('user');
    dispatch(dologout())
  
   }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <NavLink to="/" className="navbar-brand">
          {" "}
          Bootstrap
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              {" "}
              Home
            </NavLink>
            <NavLink to="/WorkspaceTabs" className="nav-link">
              Workspace{" "}
            </NavLink>
            {/* <NavLink to="/Backlog" className="nav-link">
              Backlog
            </NavLink> */}
            <NavLink to="/listuser" className="nav-link">
              List User
            </NavLink>
          </Nav>
          <Nav>
            { islogin===false 
            ? (
              <>
                <button className="btn-login" onClick={() => handleLogin()}>
                  {" "}
                  Log in
                </button>
                <button className="btn-Signup" onClick={() => handleRegister()}>
                  {" "}
                  Sign up
                </button>
              </>
            ) : (
              <NavDropdown
                title={`hi , ${account.username}`}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item onClick={() => handleShowProfile(account)}>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item  onClick={()=>handleLogout()}>Log Out</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Example
        show={show}
        handleShowProfile={handleShowProfile}
        profile={profile}
      />
   
    </Navbar>
  );
};

export default Header;