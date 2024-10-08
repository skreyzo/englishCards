import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProtectedRouter from './components/hoc/ProtectedRoute';
import Layout from './components/Layout';
import MainPage from './components/pages/MainPage';
import AccountLoginPage from './components/pages/AccountLoginPage';
import AccountNewPage from './components/pages/AccountNewPage';
import useUser from './hooks/useUser';
import QuizPage from './components/pages/QuizPage';
import useCategory from './hooks/useCategory';
import ProfilePage from './components/pages/ProfilePage';

function App() {
  const { logoutHandler, signInHandler, signUpHandler, user } = useUser();
  const { categories } = useCategory();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout user={user} logoutHandler={logoutHandler} />,
      children: [
        {
          path: '/',
          element: <MainPage categories={categories} user={user} />,
        },
        {
          path: '/account/new',
          element: <AccountNewPage signUpHandler={signUpHandler} />,
        },
        {
          path: '/account/login',
          element: <AccountLoginPage signInHandler={signInHandler} />,
        },

        {
          element: <ProtectedRouter isAllowed={user.status === 'logged'} />,
          children: [
            {
              path: '/profile',
              element: <ProfilePage categories={categories} user={user} />,
            },
            {
              path: '/quiz/:catId',
              element: <QuizPage user={user} />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
