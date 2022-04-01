import styled from 'styled-components';
import colors from '../../../styleTokens/colors';

export const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: center;
    align-items: center;
`;

export const MessageContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    font-size: 24px;
    color: ${colors.boulder};
    justify-content: center;
    align-items: center;
`;
