import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import routes from '../../../routes';
import { useAuth } from '../services/helpers';
import { LocationState } from '../services/types';

const LoggedOnlyRoute = ({ children }: { children: ReactElement }) => {
    const { pathname } = useLocation();
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) return children;

    const state: LocationState = { referrer: pathname };

    return <Navigate replace state={state} to={routes.login} />;
};

export default LoggedOnlyRoute;
