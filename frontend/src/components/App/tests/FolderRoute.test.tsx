import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { generateFolderPath } from '../../../routes';
import setup from './setup';

test('should navigate between folders', async () => {
    setup({ at: generateFolderPath() });

    // click on folder
    userEvent.click(screen.getByText('nested'));

    // expect to be redirected to folder
    expect(screen.getByText('foo')).toBeInTheDocument();

    // click on breadcrumb to return
    userEvent.click(screen.getByText('My folder'));

    expect(screen.getByText('nested')).toBeInTheDocument();
});

test('should display formatted size', async () => {
    setup({ at: generateFolderPath('nested', 'foo', 'bar') });

    expect(screen.getByText('500 B')).toBeInTheDocument();
    expect(screen.getByText('320 kB')).toBeInTheDocument();
    expect(screen.getByText('3.32 MB')).toBeInTheDocument();
});
