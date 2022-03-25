import { ReactElement, useEffect, useState } from 'react';
import request from '../../request';
import { context } from './services/context';
import { ContextValue } from './services/types';

const ENDPOINT = '/session';

const AuthenticationProvider = ({ children }: { children: ReactElement }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        request(ENDPOINT, { method: 'GET', credentials: 'include' })
            .then((res) => res.json())
            .then(setIsAuthenticated)
            .catch(() => {
                setIsAuthenticated(false);
            });
    }, []);

    const login: ContextValue['login'] = (payload) =>
        request(ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(payload),
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        })
            .then((req) => req.text())
            .then(() => {
                setIsAuthenticated(true);
            });

    const logout: ContextValue['logout'] = () =>
        request(ENDPOINT, {
            method: 'DELETE',
            credentials: 'include',
        })
            .then(() => {
                setIsAuthenticated(false);
            })
            .catch(() => {
                setIsAuthenticated(false);
            });

    return (
        <context.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </context.Provider>
    );
};

export default AuthenticationProvider;
