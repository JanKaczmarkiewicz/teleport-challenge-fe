import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import routes from '../../../routes';
import { useAuth } from '../services/helpers';

const LoggedOnlyRoute = ({ children }: { children: ReactElement }) => {
    const { pathname } = useLocation();
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? (
        children
    ) : (
        <Navigate replace state={{ referrer: pathname }} to={routes.login} />
    );
};

export default LoggedOnlyRoute;
