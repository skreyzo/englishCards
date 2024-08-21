import React from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';

export default function NavBar({ user, logoutHandler }) {
  return (
    <Navbar style={{ backgroundColor: "#0d6efd", color: "white"}} data-bs-theme="blue">
      <Container >
        <Nav.Link href="/">
          <img
            src="/1500485760140135437 (1).png"
            alt="Logo"
            style={{ height: '40px', width: 'auto' }}
          />
        </Nav.Link>
        <Nav>
          {user.data ? (
            <div style={{ display: "flex", 'align-items':'center'}}>
              <span style={{ color: "white"}} className="nav-link">{user.data.name}</span>
              <span className="nav-link">
                <Button style={{ color: "white"}} onClick={logoutHandler} size="sm">
                  Выйти
                </Button>
              </span>
            </div>
          ) : (
            <>
              <NavLink style={{ marginRight: '40px', color: "white" }} to="/account/login" className="nav-link">
                Войти
              </NavLink>

              <NavLink style={{ color: "white"}} to="/account/new" className="nav-link">
                Регистрация
              </NavLink>
              <span style={{ display: 'flex', 'align-items': 'center', marginLeft: '870px', marginRight: '30px' }}>Гость</span>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
