import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import axiosInstance, { setAccessToken } from "../api/axiosInstance"

function CategoryCard({ item, user }) {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);


  return (
    <>
      <Card
        border="rgba(238, 130, 238, 1)"
        style={{ width: '18rem', borderColor: '#1E90FF', position: 'relative' }}
      >
        <Card.Body>
          <div className="progress" style={{ height: '10px', marginBottom: '15px' }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: `${progress}%`,
                background:
                  'linear-gradient(90deg, rgba(0, 0, 255, 1) 0%, rgba(0, 255, 255, 1) 100%)',
              }}
            ></div>
          </div>
          <Card.Title style={{ marginBottom: '15px' }}>{item.name}</Card.Title>
          <Button
            onClick={() => navigate(`/quiz/${item.id}`)}
            style={{ border: 'none', background: '#1E90FF' }}
          >
            Изучать
          </Button>
          <div
            style={{
              position: 'absolute',
              bottom: '23px',
              right: '30px',
              // fontSize: '14px',
              // fontWeight: 'bold',
              color: 'Black',
            }}
          >
            Пройдено: {progress.toFixed(0)}%
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default CategoryCard;
