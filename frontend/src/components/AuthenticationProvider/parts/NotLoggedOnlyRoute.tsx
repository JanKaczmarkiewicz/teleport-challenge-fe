import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import routes from '../../../routes';
import { useAuth } from '../services/helpers';

const NotLoggedOnlyRoute = ({ children }: { children: ReactElement }) => {
    const { isAuthenticated } = useAuth();
    const { state } = useLocation();

    const to = state?.referrer || routes.root;
    return isAuthenticated ? <Navigate replace state={{}} to={to} /> : children;
};

export default NotLoggedOnlyRoute;
