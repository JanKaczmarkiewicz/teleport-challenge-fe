import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import routes from '../../../routes';
import { useIsLoggedIn } from '../services/helpers';

const LoggedOnlyRoute = ({ children }: { children: ReactElement }) => {
    const isLoggedIn = useIsLoggedIn();
    return isLoggedIn ? children : <Navigate replace to={routes.login} />;
};

export default LoggedOnlyRoute;
