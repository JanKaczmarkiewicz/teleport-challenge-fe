import { useContext } from 'react';
import { context } from './context';

export const useIsLoggedIn = () => useContext(context);
