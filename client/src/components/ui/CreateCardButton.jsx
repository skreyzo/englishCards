import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import axiosInstance from '../api/axiosInstance';
import '../../css/CreateCardButton.css';

export default function CreateCardButton({ categories }) {
  const item = { id: 1, title: 'Добавить слово' };
  const [selectedId, setSelectedId] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));

    const res = await axiosInstance.post('/quiz', formData);

    if (res.status === 200) {
      setSelectedId(null);
    } else {
      console.error('Failed to add new card');
    }
  };

  return (
    <div>
      <motion.div
        key={item.id}
        layoutId={item.id}
        onClick={() => setSelectedId(item.id)}
        style={{
          color: 'white',
          width: '160px',
          padding: '8px',
          margin: '10px',
          backgroundColor: '#1E90FF',
          cursor: 'pointer',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <motion.h2 style={{ fontSize: '18px', margin: 0 }}>{item.title}</motion.h2>
      </motion.div>
      <AnimatePresence>
        {selectedId && (
          <>
            {/* Затемняющий фон */}
            <motion.div
              onClick={() => setSelectedId(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'black',
                zIndex: 999,
              }}
            />

            {/* Модальное окно */}
            <motion.div
              layoutId={selectedId}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{
                position: 'fixed',
                top: '30%',
                left: '42%',
                transform: 'translate(-50%, -50%)',
                padding: '40px',
                backgroundColor: '#1E90FF',
                borderRadius: '8px',
                zIndex: 1000,
              }}
            >
              <motion.button
                onClick={() => setSelectedId(null)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: 'white',
                  color: '#1E90FF',
                  cursor: 'pointer',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: 'normal',
                }}
              >
                X
              </motion.button>
              <form onSubmit={submitHandler}>
                <div>
                  <label>Английское слово</label>
                  <input
                    type="text"
                    name="engWord"
                    style={{
                      display: 'block',
                      marginBottom: '10px',
                      padding: '8px',
                      borderRadius: '8px',
                      border: '1px solid #ccc',
                      width: '100%',
                      boxSizing: 'border-box',
                    }}
                    required
                  />
                </div>
                <div>
                  <label>Русское слово</label>
                  <input
                    type="text"
                    name="rusWord"
                    style={{
                      display: 'block',
                      marginBottom: '10px',
                      padding: '8px',
                      borderRadius: '8px',
                      border: '1px solid #ccc',
                      width: '100%',
                      boxSizing: 'border-box',
                    }}
                    required
                  />
                </div>
                <div>
                  <label>Категория</label>
                  <select
                    name="categoryId"
                    style={{
                      display: 'block',
                      marginBottom: '10px',
                      padding: '8px',
                      borderRadius: '8px',
                      border: '1px solid #ccc',
                      width: '100%',
                      boxSizing: 'border-box',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                    }}
                    required
                  >
                    {categories.map((item) => (
                      <option key={item.id} name="categoryId" value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <motion.button
                  type="submit"
                  style={{
                    padding: '10px',
                    marginTop: '20px',
                    backgroundColor: 'white',
                    color: '#1E90FF',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                >
                  Добавить
                </motion.button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
