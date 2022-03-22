import { screen } from '@testing-library/react';
import { generateFolderPath } from '../../../routes';
import setup from './setup';

test('should render 404 page', async () => {
    setup({ at: '/not-exisiting-page' });

    expect(await screen.findByText('Page not found')).toBeInTheDocument();
});

test('should render 404 page when no folder found', async () => {
    setup({ at: generateFolderPath('foo', 'bar') });

    expect(await screen.findByText('Page not found')).toBeInTheDocument();
});
