import { screen } from '@testing-library/react';
import { generateFolderPath } from '../../../routes';
import setup, { login } from './setup';

test('should render 404 page', async () => {
    setup({ at: '/not-existing-page' });
    login();

    expect(await screen.findByText('Page not found')).toBeInTheDocument();
});

test('should render 404 page when no folder found', async () => {
    setup({ at: generateFolderPath('foo', 'bar') });
    login();

    expect(await screen.findByText('Page not found')).toBeInTheDocument();
});
