import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import routes from '../../../routes';
import { useIsLoggedIn } from '../services/helpers';

const NotLoggedOnlyRoute = ({ children }: { children: ReactElement }) => {
    const isLoggedIn = useIsLoggedIn();
    return isLoggedIn ? <Navigate replace to={routes.root} /> : children;
};

export default NotLoggedOnlyRoute;
