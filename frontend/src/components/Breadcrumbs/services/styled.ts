import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../../colors';

export const Breadcrumb = styled(Link)`
    text-decoration: none;
    padding: 8px 16px;
    font-size: 18px;
    color: ${colors.grey};

    :last-of-type {
        color: ${colors.dark};
        pointer-events: none;
    }
`;

export const Containter = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
