import { ReactElement, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import request from '../../request';
import routes from '../../routes';

const PrivateRoute = ({ children }: { children: ReactElement }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        request('/login', { method: 'GET' })
            .then(() => {
                setIsLoggedIn(true);
            })
            .catch(() => {
                setIsLoggedIn(false);
            });
    }, []);

    if (!isLoggedIn) return <Navigate to={routes.login} />;

    return children;
};

export default PrivateRoute;
