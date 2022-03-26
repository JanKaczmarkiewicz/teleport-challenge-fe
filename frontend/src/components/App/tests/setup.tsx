import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { TEST_PASSWORD, TEST_USERNAME } from '../../../mocks/server';

const setup = ({ at }: { at: string }) => {
    render(
        <MemoryRouter initialEntries={[at]}>
            <App />
        </MemoryRouter>
    );
};

export const login = () => {
    userEvent.paste(screen.getByPlaceholderText('username'), TEST_USERNAME);
    userEvent.paste(screen.getByPlaceholderText('password'), TEST_PASSWORD);

    userEvent.click(screen.getByRole('button', { name: /login/i }));
};

export default setup;
