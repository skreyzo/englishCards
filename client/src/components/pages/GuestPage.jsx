import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { Button, Container, Row } from 'react-bootstrap';
import LoginButtons from '../ui/LoginButtons';


export default function GuestPage() {
  return (
    <>
      <Container>
        <Row className="mt-3">
          <img
            src="https://i.pinimg.com/originals/23/a0/7f/23a07f1a97068de2fdbfd527c1b2afb4.jpg"
            alt="Flower"
            style={{ width: '80%' }}
          />

          <LoginButtons />
        </Row>
      </Container>
    </>
  );
}
