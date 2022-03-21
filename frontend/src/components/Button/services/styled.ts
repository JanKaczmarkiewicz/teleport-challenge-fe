import styled from 'styled-components';
import colors from '../../../styleTokens/colors';

export const Button = styled.button`
    border: 1px solid ${colors.iron};
    border-radius: 0.25rem;
    color: ${colors.shark};
    background-color: inherit;
    cursor: pointer;
    padding: 0.5rem 1rem;
`;
