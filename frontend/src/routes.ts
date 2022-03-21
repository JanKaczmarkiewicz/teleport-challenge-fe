import { generatePath } from 'react-router-dom';

const routes = {
    any: '*',
    root: '/' as const,
    notFound: '/not-found' as const,
    folder: '/folder/*' as const,
};

export const generateFolderPath = (parts: string[] = ['']) =>
    generatePath(routes.folder, {
        '*': parts.join('/'),
    });

export default routes;
