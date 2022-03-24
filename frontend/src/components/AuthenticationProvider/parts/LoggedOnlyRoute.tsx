import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import routes from '../../../routes';
import { useAuth } from '../services/helpers';

const LoggedOnlyRoute = ({ children }: { children: ReactElement }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate replace to={routes.login} />;
};

export default LoggedOnlyRoute;
