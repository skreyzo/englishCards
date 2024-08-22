import React from 'react';
import { Button, Container, Nav, Navbar, Dropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function NavBar({ user, logoutHandler }) {
  return (
    <Navbar expand="lg" style={{ backgroundColor: "#0d6efd", color: "white" }} data-bs-theme="blue">
      <Container>
        <Navbar.Brand href="/">
          <img
            src="/1500485760140135437 (1).png"
            alt="Logo"
            style={{ height: '40px', width: 'auto' }}
          />
        </Navbar.Brand>

        <span style={{ color: "white" }}>
        {user.data?.name ? `Привет, ${user.data.name}!` : ""}
         
        </span>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user.data ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="link" className="nav-link" style={{ color: "white" }}>
                  Личный кабинет
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#">Мои достижения</Dropdown.Item>
                  <Dropdown.Item as="span" onClick={logoutHandler}>
                    Выйти
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <NavLink style={{ marginRight: '40px', color: "white" }} to="/account/login" className="nav-link">
                  Войти
                </NavLink>
                <NavLink style={{ color: "white" }} to="/account/new" className="nav-link">
                  Регистрация
                </NavLink>
                <span style={{ display: 'flex', alignItems: 'center', marginLeft: '870px', marginRight: '30px' }}>
                  Гость
                </span>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}