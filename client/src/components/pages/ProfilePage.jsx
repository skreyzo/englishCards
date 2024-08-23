import React from 'react';
import UserUi from '../ui/UserCategoryUi';
import CreateCardButton from '../ui/CreateCardButton';

export default function ProfilePage({ categories, user }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      {/* Заглушка под фото и имя пользователя */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        {/* Заглушка под фото */}
        <div
          style={{
            width: '100px',
            height: '100px',
            backgroundColor: '#1E90FF',  // Синий цвет заглушки
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            color: '#fff',
            marginBottom: '10px',  // Отступ снизу для заглушки
          }}
        >
          {/* Инициалы пользователя */}
          {user.data.name[0].toUpperCase()}
        </div>

        {/* Имя пользователя */}
        <h1 style={{ fontSize: '24px', margin: 0 }}>{user.data.name.toUpperCase()}</h1>

        <CreateCardButton categories={categories} />
      </div>

      {/* Кнопка CreateCardButton */}
      <div style={{ marginBottom: '20px' }}>
        
      </div>

      {/* Компонент UserUi */}
      <UserUi categories={categories} user={user} />
    </div>
  );
}
