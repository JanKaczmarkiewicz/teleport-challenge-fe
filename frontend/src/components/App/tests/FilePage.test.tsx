import { render, screen } from '@testing-library/react';
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

test('should render list of files and dirs', async () => {
    setup({ at: generateFolderPath() });

    expect(await screen.findByText('README.md')).toBeInTheDocument();
    expect(screen.getByText('nested')).toBeInTheDocument();
});

test('should render 404 page', async () => {
    setup({ at: '/not-exisiting-page' });

    expect(await screen.findByText('Page not found')).toBeInTheDocument();
});

test('should render 404 page when no folder found', async () => {
    setup({ at: generateFolderPath(['foo', 'bar']) });

    expect(await screen.findByText('Page not found')).toBeInTheDocument();
});
