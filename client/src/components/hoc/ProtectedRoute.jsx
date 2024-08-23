import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({
  children,
  isAllowed,
  redirectPath = '/',
}) {
  // Если доступ запрещен (isAllowed === false), перенаправляем на redirectPath
  if (!isAllowed) return <Navigate to={redirectPath} replace />;
  
  // Если доступ разрешен, рендерим дочерние элементы или <Outlet />
  return children || <Outlet />;
}