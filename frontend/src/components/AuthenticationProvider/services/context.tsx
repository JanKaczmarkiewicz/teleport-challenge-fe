import { createContext } from 'react';
import { ContextValue } from './types';

export const context = createContext<ContextValue>({
    isAuthenticated: false,
    login: () => Promise.resolve(),
    /* eslint-disable @typescript-eslint/no-empty-function */
    logout: () => {},
});
