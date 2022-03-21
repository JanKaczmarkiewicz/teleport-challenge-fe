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
