import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { generateFolderPath } from '../../../routes';
import App from '../App';

const setup = ({ at }: { at: string }) => {
    render(
        <MemoryRouter initialEntries={[at]}>
            <App />
        </MemoryRouter>
    );
};

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

test('should render 404 page', async () => {
    setup({ at: '/not-exisiting-page' });

    expect(await screen.findByText('Page not found')).toBeInTheDocument();
});

test('should render 404 page when no folder found', async () => {
    setup({ at: generateFolderPath(['foo', 'bar']) });

    expect(await screen.findByText('Page not found')).toBeInTheDocument();
});
