import { screen } from '@testing-library/react';
import { generateFolderPath } from '../../../routes';
import setup from './setup';

test('should render 404 page', async () => {
    setup({ at: '/not-exisiting-page' });

    expect(screen.getByText('Page not found')).toBeInTheDocument();
});

test('should render 404 page when no folder found', async () => {
    setup({ at: generateFolderPath('foo', 'bar') });

    expect(screen.getByText('Page not found')).toBeInTheDocument();
});
