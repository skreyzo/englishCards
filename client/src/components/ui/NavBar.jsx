import React from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

export default function NavBar({ user, logoutHandler }) {

  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Nav className="me-auto">
          <NavLink to="/" className="nav-link">
            Главная
          </NavLink>

        </Nav>
        <Nav>
          {!user.data && (
            <>
              <NavLink to="/account/login" className="nav-link">
              Войти
              </NavLink>
              <NavLink to="/account/new" className="nav-link">
              Регистрация
              </NavLink>
              <span className="nav-link">|</span>
            </>
          )}

          <span className="nav-link">
            {user.data ? user.data.name : 'Гость'}
          </span>
          {user.data && (
            <span className="nav-link">
              <Button onClick={logoutHandler} variant="outline-danger" size="sm">
                Выйти
              </Button>
            </span>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}