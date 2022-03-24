import { generatePath } from 'react-router-dom';

const routes = {
    any: '*' as const,
    root: '/' as const,
    notFound: '/not-found' as const,
    folder: '/folder/*' as const,
    login: '/login' as const,
};

export const generateFolderPath = (...parts: string[]) =>
    generatePath(routes.folder, {
        '*': parts.join('/'),
    });

export default routes;
