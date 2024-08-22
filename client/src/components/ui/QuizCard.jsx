


import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export default function QuizCard({ engWord, rusWord, onHide, id }) {
  const [isFlipped, setIsFlipped] = useState(false);

  //! функиция, которая переворачивает карточку на другой язык.
  function onChangeShow() {
    const newStatus = !isFlipped;
    setIsFlipped(newStatus);
  }

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        {isFlipped ? <Card.Text>{rusWord}</Card.Text> : <Card.Text>{engWord}</Card.Text>}
        <Button variant="danger" onClick={() => onHide(id)}>
          Изучено
        </Button>
        <Button variant="warning" onClick={onChangeShow}>
          Перевернуть
        </Button>
      </Card.Body>
    </Card>






  );
}
















