import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProtectedRouter from './components/hoc/ProtectedRoute';
import Layout from './components/Layout';
import MainPage from './components/pages/MainPage';
import AccountLoginPage from './components/pages/AccountLoginPage';
import AccountNewPage from './components/pages/AccountNewPage';
import useUser from './hooks/useUser';
import QuizPage from './components/pages/QuizPage';
import { useState } from 'react';

const cardsArr = [
  {
    id: 1,
    rusWord: 'Картошка',
    engWord: 'Potato',
    categoryId: 1,
    userId: 1,
  },
  
  {
    id: 11,
    rusWord: 'Яблоко',
    engWord: 'Apple',
    categoryId: 2,
    userId: 1,
  },
  {
    id: 12,
    rusWord: 'Банан',
    engWord: 'Banana',
    categoryId: 2,
    userId: 1,
  },
  {
    id: 13,
    rusWord: 'Апельсин',
    engWord: 'Orange',
    categoryId: 2,
    userId: 1,
  },
  {
    id: 14,
    rusWord: 'Груша',
    engWord: 'Pear',
    categoryId: 2,
    userId: 1,
  },
  {
    id: 15,
    rusWord: 'Виноград',
    engWord: 'Grapes',
    categoryId: 2,
    userId: 1,
  },
  {
    id: 16,
    rusWord: 'Киви',
    engWord: 'Kiwi',
    categoryId: 2,
    userId: 1,
  },
  {
    id: 17,
    rusWord: 'Манго',
    engWord: 'Mango',
    categoryId: 2,
    userId: 1,
  },
  {
    id: 18,
    rusWord: 'Арбуз',
    engWord: 'Watermelon',
    categoryId: 2,
    userId: 1,
  },
  {
    id: 19,
    rusWord: 'Дыня',
    engWord: 'Melon',
    categoryId: 2,
    userId: 1,
  },
  {
    id: 20,
    rusWord: 'Персик',
    engWord: 'Peach',
    categoryId: 2,
    userId: 1,
  },
  {
    id: 21,
    rusWord: 'Собака',
    engWord: 'Dog',
    categoryId: 3,
    userId: 1,
  },
  {
    id: 22,
    rusWord: 'Кошка',
    engWord: 'Cat',
    categoryId: 3,
    userId: 1,
  },
  {
    id: 23,
    rusWord: 'Лошадь',
    engWord: 'Horse',
    categoryId: 3,
    userId: 1,
  },
  {
    id: 24,
    rusWord: 'Корова',
    engWord: 'Cow',
    categoryId: 3,
    userId: 1,
  },
  {
    id: 25,
    rusWord: 'Овца',
    engWord: 'Sheep',
    categoryId: 3,
    userId: 1,
  },
  {
    id: 26,
    rusWord: 'Свинья',
    engWord: 'Pig',
    categoryId: 3,
    userId: 1,
  },
  {
    id: 27,
    rusWord: 'Кролик',
    engWord: 'Rabbit',
    categoryId: 3,
    userId: 1,
  },
  {
    id: 28,
    rusWord: 'Курица',
    engWord: 'Chicken',
    categoryId: 3,
    userId: 1,
  },
  {
    id: 29,
    rusWord: 'Утка',
    engWord: 'Duck',
    categoryId: 3,
    userId: 1,
  },
  {
    id: 30,
    rusWord: 'Гусь',
    engWord: 'Goose',
    categoryId: 3,
    userId: 1,
  },
  {
    id: 31,
    rusWord: 'Красный',
    engWord: 'Red',
    categoryId: 4,
    userId: 1,
  },
  {
    id: 32,
    rusWord: 'Синий',
    engWord: 'Blue',
    categoryId: 4,
    userId: 1,
  },
  {
    id: 33,
    rusWord: 'Зеленый',
    engWord: 'Green',
    categoryId: 4,
    userId: 1,
  },
  {
    id: 34,
    rusWord: 'Желтый',
    engWord: 'Yellow',
    categoryId: 4,
    userId: 1,
  },
  {
    id: 35,
    rusWord: 'Черный',
    engWord: 'Black',
    categoryId: 4,
    userId: 1,
  },
  {
    id: 36,
    rusWord: 'Белый',
    engWord: 'White',
    categoryId: 4,
    userId: 1,
  },
  {
    id: 37,
    rusWord: 'Оранжевый',
    engWord: 'Orange',
    categoryId: 4,
    userId: 1,
  },
  {
    id: 38,
    rusWord: 'Фиолетовый',
    engWord: 'Purple',
    categoryId: 4,
    userId: 1,
  },
  {
    id: 39,
    rusWord: 'Розовый',
    engWord: 'Pink',
    categoryId: 4,
    userId: 1,
  },
  {
    id: 40,
    rusWord: 'Коричневый',
    engWord: 'Brown',
    categoryId: 4,
    userId: 1,
  },
  {
    id: 41,
    rusWord: 'Стол',
    engWord: 'Table',
    categoryId: 5,
    userId: 1,
  },
  {
    id: 42,
    rusWord: 'Стул',
    engWord: 'Chair',
    categoryId: 5,
    userId: 1,
  },
  {
    id: 43,
    rusWord: 'Книга',
    engWord: 'Book',
    categoryId: 5,
    userId: 1,
  },
  {
    id: 44,
    rusWord: 'Ноутбук',
    engWord: 'Laptop',
    categoryId: 5,
    userId: 1,
  },
  {
    id: 45,
    rusWord: 'Телефон',
    engWord: 'Phone',
    categoryId: 5,
    userId: 1,
  },
  {
    id: 46,
    rusWord: 'Чашка',
    engWord: 'Cup',
    categoryId: 5,
    userId: 1,
  },
  {
    id: 47,
    rusWord: 'Ложка',
    engWord: 'Spoon',
    categoryId: 5,
    userId: 1,
  },
  {
    id: 48,
    rusWord: 'Вилка',
    engWord: 'Fork',
    categoryId: 5,
    userId: 1,
  },
  {
    id: 49,
    rusWord: 'Нож',
    engWord: 'Knife',
    categoryId: 5,
    userId: 1,
  },
  {
    id: 50,
    rusWord: 'Часы',
    engWord: 'Watch',
    categoryId: 5,
    userId: 1,
  },
];

const categoriesArr = [
  { id: 1, name: 'Vegetables' },
  { id: 2, name: 'Fruits' },
  { id: 3, name: 'Animals' },
  { id: 4, name: 'Colors' },
  { id: 5, name: 'Objects' },
];
function App() {
  const { logoutHandler, signInHandler, signUpHandler, user } = useUser();
  const [cards, setCards] = useState(cardsArr);
  const [categories, setCategories] = useState(categoriesArr);

  //! Функция удаления карточки из квиза по кнопке "изучено"
  function onHide(id) {
    const newArr = cards.filter((card) => card.id !== Number(id));
    setCards(newArr);
  }

  

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout user={user} logoutHandler={logoutHandler} />,
      children: [
        {
          path: '/',
          element: <MainPage user={user} />,
        },
        {
          path: '/quiz/:id',
          element: <QuizPage cards={cards} onHide={onHide} />,
        },
        {
          element: <ProtectedRouter isAllowed={user.status !== 'logged'} />,
          children: [
            {
              path: '/account/new',
              element: <AccountNewPage signUpHandler={signUpHandler} />,
            },
            {
              path: '/account/login',
              element: <AccountLoginPage signInHandler={signInHandler} />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;