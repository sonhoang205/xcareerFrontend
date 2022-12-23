import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Example from "../header/profile-modal";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { dologout } from "../../redux/action/userAction"
import Language from "./language"
import { useTranslation, Trans } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();

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

  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch(dologout())
    navigate("/");


  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <NavLink to="/" className="navbar-brand">
          {" "}

        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link" >
              {" "}
              {t('header.firstTittle')}
            </NavLink>
            <NavLink to="/Workspace" className="nav-link" >
              {t('header.secondTittle')}
            </NavLink>
            {/* <NavLink to="/Backlog" className="nav-link">
              Backlog
            </NavLink> */}
            <NavLink to="/listuser" className="nav-link" >
              {t('header.thirdTittle')}
            </NavLink>
            {/* <NavLink to="/DashBoard" className="nav-link" >
              DashBoard
            </NavLink> */}
          </Nav>

          <Nav>

            {islogin === false
              ? (
                <>
                  <button className="btn-login" onClick={() => handleLogin()}>
                    {" "}
                    {t('header.fourthTittle.textOne')}
                  </button>
                  <button className="btn-Signup" onClick={() => handleRegister()}>
                    {" "}
                    {t('header.fourthTittle.textTwo')}
                  </button>
                </>
              ) : (
                <NavDropdown
                  title={`hi , ${account.username}`}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item onClick={() => handleShowProfile(account)}>
                    {t('header.fourthTittle.textThree')}
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => handleLogout()}>
                    {t('header.fourthTittle.textFor')}
                  </NavDropdown.Item>
                </NavDropdown>

              )}
            <Language />

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