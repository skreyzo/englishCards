import React from 'react';
import QuizCard from '../ui/QuizCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

export default function QuizPage({ user }) {
  const [cards, setCards] = useState([]);

  const { catId } = useParams();

  useEffect(() => {
    axiosInstance(`/cat/${catId}?userId=${user.data.id}`)
      .then((res) => setCards(res.data))
      .catch((err) => console.error(err));
  }, [catId, user.data.id]);




  const hideHandler = async (cardId, userId) => {
    try {
      await axiosInstance.post('/progress', { cardId, userId });
      setCards((prev) => prev.filter((card) => card.id !== cardId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Row>
      {cards.map((el) => (
        <Col xs={12} sm={6} md={4} lg={3} className="mb-4 mt-4" key={el.id}>
          <QuizCard
            engWord={el.engWord}
            rusWord={el.rusWord}
            id={el.id}
            userId={user.data.id} // Убедитесь, что userId передается корректно
            hideHandler={hideHandler}
          />
        </Col>
      ))}
    </Row>
  );
}