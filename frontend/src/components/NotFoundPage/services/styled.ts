import styled from 'styled-components';
import colors from '../../../colors';
import PageContainer from '../../PageContainer/PageContainer';

export const NotFoundPageContainer = styled(PageContainer)`
    display: flex;
    flex-direction: column;
    gap: 32px;
    justify-content: center;
    align-items: center;
`;

export const MessageContiner = styled.div`
    display: flex;
    gap: 8px;
    font-size: 24px;
    color: ${colors.builder};
    justify-content: center;
    align-items: center;
`;
