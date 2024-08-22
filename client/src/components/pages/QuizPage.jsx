import React from 'react';
import QuizCard from '../ui/QuizCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

export default function QuizPage() {
  const [cards, setCards] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    axiosInstance(`/cat/${id}`)
      .then((res) => setCards(res.data))
      .catch((err) => console.error(err));
  }, []);

  //   //! Функция удаления карточки из квиза по кнопке "изучено"

  const hideHandler = async (id) => {
    try {
      await axiosInstance.delete(`/quiz/${id}`);
      setCards((prev) => prev.filter((cat) => cat.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Row>
      {cards.map((el) => (
        <Col xs={12} sm={6} md={4} lg={3} className="mb-4 mt-4">
  <QuizCard
    engWord={el.engWord}
    rusWord={el.rusWord}
    id={el.id}
    hideHandler={hideHandler}
    key={el.id}
  />
</Col>
      ))}
    </Row>
  );
}
