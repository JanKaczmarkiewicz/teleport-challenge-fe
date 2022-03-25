import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

const setup = ({ at }: { at: string }) => {
    render(
        <MemoryRouter initialEntries={[at]}>
            <App />
        </MemoryRouter>
    );
};

export const login = () => {
    userEvent.paste(screen.getByPlaceholderText('username'), 'test');
    userEvent.paste(screen.getByPlaceholderText('password'), 'test123');

    userEvent.click(screen.getByRole('button', { name: /login/i }));
};

export default setup;
