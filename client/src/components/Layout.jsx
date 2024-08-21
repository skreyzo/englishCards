import Container from 'react-bootstrap/Container';
import { Outlet } from 'react-router-dom';
import Loader from './hoc/Loader';
import NavBar from './ui/NavBar';

export default function Layout({ user, logoutHandler }) {
  return (
    <Loader showSpinner={user.status === 'fetching'}>
      <Container>
        <NavBar user={user} logoutHandler={logoutHandler} />
        <Outlet />
      </Container>
    </Loader>
  );
}