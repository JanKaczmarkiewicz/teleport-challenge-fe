import styled from 'styled-components';
import colors from '../../../styleTokens/colors';
import PageContainer from '../../PageContainer/PageContainer';

export const NotFoundPageContainer = styled(PageContainer)`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: center;
    align-items: center;
`;

export const MessageContiner = styled.div`
    display: flex;
    gap: 0.5rem;
    font-size: 24px;
    color: ${colors.boulder};
    justify-content: center;
    align-items: center;
`;
