import { ReactElement, useEffect, useState } from 'react';
import request from '../../request';
import { context } from './services/context';

const AuthenticationProvider = ({ children }: { children: ReactElement }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        request<boolean>('/session', { method: 'GET' })
            .then(setIsLoggedIn)
            .catch(() => {
                setIsLoggedIn(false);
            });
    }, []);

    return <context.Provider value={isLoggedIn}>{children}</context.Provider>;
};

export default AuthenticationProvider;
