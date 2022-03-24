import styled from 'styled-components';
import colors from '../../../styleTokens/colors';
import PageContainer from '../../PageContainer/PageContainer';

export const LoginPageContainer = styled(PageContainer)`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding-top: 2.5rem;
    padding-bottom: 2rem;
    padding-inline: 2rem;
    max-width: 100%;
    width: 25rem;
    border: 1px solid ${colors.iron};
    border-radius: 0.25rem;
    align-items: center;
`;

export const Text = styled.span`
    font-size: 24px;
    color: ${colors.shark};
`;
