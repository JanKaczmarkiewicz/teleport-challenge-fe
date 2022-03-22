import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { generateFolderPath } from '../../../routes';
import setup from './setup';

test('should navigate between folders', async () => {
    setup({ at: generateFolderPath() });

    // click on folder
    userEvent.click(await screen.findByText('nested'));

    // expect to be redirected to folder
    expect(await screen.findByText('foo')).toBeInTheDocument();

    // click on breadcrumb to return
    userEvent.click(await screen.findByText('My folder'));

    expect(await screen.findByText('nested')).toBeInTheDocument();
});

test('should display formatted size', async () => {
    setup({ at: generateFolderPath('nested', 'foo', 'bar') });

    expect(await screen.findByText('500 B')).toBeInTheDocument();
    expect(screen.getByText('320 kB')).toBeInTheDocument();
    expect(screen.getByText('3.32 MB')).toBeInTheDocument();
});

test('should filter by name attribute', async () => {
    setup({ at: generateFolderPath('nested', 'foo', 'bar') });

    expect(await screen.findByText('500 B')).toBeInTheDocument();
    expect(screen.getByText('320 kB')).toBeInTheDocument();
    expect(screen.getByText('3.32 MB')).toBeInTheDocument();
});
