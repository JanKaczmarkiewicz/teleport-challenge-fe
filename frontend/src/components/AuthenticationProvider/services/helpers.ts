import { useContext } from 'react';
import { context } from './context';
import { LocationState } from './types';

export const useAuth = () => useContext(context);

export const stateContainsReferrer = (state: unknown): state is LocationState =>
    typeof state === 'object' && state !== null && 'referrer' in state;
