import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../../styleTokens/colors';

export const Breadcrumb = styled(Link)`
    text-decoration: none;
    padding: 0.5rem 1rem;
    font-size: 18px;
    color: ${colors.boulder};
    border-radius: 0.5rem;

    :hover {
        background-color: ${colors.porcelain};
    }

    :last-of-type {
        color: ${colors.shark};
        pointer-events: none;
    }
`;

export const Container = styled.nav`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
