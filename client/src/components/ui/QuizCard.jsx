import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { motion } from 'framer-motion';
import '../../css/QuizCard.css';

export default function QuizCard({ engWord, rusWord, hideHandler, id }) {
  const [isFlipped, setIsFlipped] = useState(false);

  function onChangeShow() {
    const newStatus = !isFlipped;
    setIsFlipped(newStatus);
  }

  return (
    <>
      <motion.div
        style={{ perspective: '1000px' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card onClick={onChangeShow}>
          <Card.Body style={{ backfaceVisibility: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            {!isFlipped ? (
              <div>
                <Card.Text style={{ textAlign: 'center' }}>{engWord}</Card.Text>
              </div>
            ) : (
              <Card.Text style={{ transform: 'rotateY(180deg)', textAlign: 'center',                   color: 'red',
              }}>{rusWord}</Card.Text>
            )}
          </Card.Body>
        </Card>
      </motion.div>
      <div style={{ width: '100%' }}>
        <Button variant="success" onClick={() => hideHandler(id)} style={{ width: '100%' }}>
          Изучено
        </Button>
      </div>
    </>
  );
}