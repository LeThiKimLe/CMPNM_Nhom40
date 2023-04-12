import { useLocation, Navigate } from 'react-router-dom';
import TokenService from '../features/token/token.service';
export const PrivateComponent = ({ children }) => {
  const token = TokenService.getLocalAccessToken();
  const { pathname } = useLocation();
  return token ? children : <Navigate to="/sign-in" state={{ from: pathname }} replace />;
};
