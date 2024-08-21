import React from 'react';
import QuizCard from '../ui/QuizCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router-dom';

export default function QuizPage({ cards, onHide }) {
  const { id } = useParams();
  //! параметрический феч запрос на эндпоинт
  const filteredCards = cards.filter((card) => card.categoryId === Number(id));
  //!-----------------------------------

  return (
    <Row>
      {filteredCards.map((el) => (
        <Col xs={12} sm={6} md={4} lg={3} className="mb-4 mt-4">
          <QuizCard engWord={el.engWord} rusWord={el.rusWord} id={el.id} onHide={onHide}  />
        </Col>
      ))}
    </Row>
  );
}
