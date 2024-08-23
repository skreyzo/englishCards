import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function LoginButtons() {
  return (
    <>
      <Col>
        <Row>
          <NavLink
            style={{ marginRight: '40px', color: 'white' }}
            to="/account/login"
            className="nav-link"
          >
            <Button className="mt-4" style={{ width: '200px', height: '60px' }}>
              Войти
            </Button>
          </NavLink>
        </Row>

        <Row>
          <NavLink style={{ color: 'white' }} to="/account/new" className="nav-link">
            <Button className="mt-4" style={{ width: '200px', height: '60px' }}>
              Регистрация
            </Button>
          </NavLink>
        </Row>
      </Col>
    </>
  );
}