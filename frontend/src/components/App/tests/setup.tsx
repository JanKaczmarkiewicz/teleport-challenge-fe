import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

const setup = ({ at }: { at: string }) => {
    render(
        <MemoryRouter initialEntries={[at]}>
            <App />
        </MemoryRouter>
    );
};

export default setup;
