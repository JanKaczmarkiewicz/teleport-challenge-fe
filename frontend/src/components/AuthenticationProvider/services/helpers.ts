import { useContext } from 'react';
import { context } from './context';

export const useAuth = () => useContext(context);
