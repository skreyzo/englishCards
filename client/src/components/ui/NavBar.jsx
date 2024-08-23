import React from 'react';
import { Button, Container, Nav, Navbar, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function NavBar({ user, logoutHandler }) {
  const navigate = useNavigate();

  return (
    <Navbar
      expand="lg"
      style={{ backgroundColor: '#0d6efd', color: 'white' }}
      data-bs-theme="blue"
    >
      <Container>
        <Navbar.Brand onClick={() => navigate(`/`)}>
          <img
            src="/1500485760140135437 (1).png"
            alt="Logo"
            style={{ height: '40px', width: 'auto' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user.status === 'logged' ? (
              <>
                <Nav.Item>
                  <Nav.Link style={{ color: 'white', cursor: 'default' }}>Привет, {user.data.name}!</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    style={{
                      color: 'white',
                      cursor: 'pointer',
                      transition: 'color 0.3s ease', // Добавляем плавный переход
                    }}
                    onMouseEnter={(e) => (e.target.style.color = '#b0c4de')} // Цвет при наведении
                    onMouseLeave={(e) => (e.target.style.color = 'white')} // Цвет при уходе
                    onClick={() => navigate(`/`)}
                  >
                    Категории
                  </Nav.Link>
                </Nav.Item>
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="link"
                    className="nav-link"
                    style={{
                      color: 'white',
                      cursor: 'pointer',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = '#b0c4de')}
                    onMouseLeave={(e) => (e.target.style.color = 'white')}
                  >
                    Личный кабинет
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => navigate(`/profile`)}>
                      Мои достижения
                    </Dropdown.Item>
                    <Dropdown.Item as="span" onClick={logoutHandler}>
                      Выйти
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>lol</>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
