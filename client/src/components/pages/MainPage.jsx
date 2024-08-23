import UserUi from '../ui/UserCategoryUi';
import GuestUi from '../ui/GuestUi';

export default function MainPage({ categories, user }) {
  return (
    <>
      {user.status === 'logged' ? (
        <>
          <UserUi categories={categories} user={user} />
        </>
      ) : (
        <>
          <GuestUi />
        </>
      )}
    </>
  );
}
