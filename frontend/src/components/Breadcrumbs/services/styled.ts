import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../../colors';

export const Breadcrumb = styled(Link)`
    text-decoration: none;
    padding: 8px 16px;
    font-size: 18px;
    color: ${colors.boulder};
    border-radius: 8px;

    :hover {
        background-color: ${colors.porcelain};
    }

    :last-of-type {
        color: ${colors.shark};
        pointer-events: none;
    }
`;

export const Containter = styled.nav`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
