import styled from 'styled-components';
import colors from '../../../styleTokens/colors';
import iconSizes from '../../../styleTokens/iconSizes';

const PADDING_LEFT = '8px';

export const InputWrapper = styled.div<{ isFullWidth?: boolean }>`
    position: relative;
    display: flex;
    align-items: center;
    width: ${({ isFullWidth }) => (isFullWidth ? '100%' : '300px')};

    input {
        padding: ${PADDING_LEFT};
    }

    svg + input {
        padding-left: calc(${PADDING_LEFT} + ${iconSizes.medium} + 10px);
    }

    svg {
        position: absolute;
        left: ${PADDING_LEFT};
    }
`;

export const Input = styled.input`
    border: 1px solid ${colors.iron};
    border-radius: 0.25rem;
    height: 40px;
    flex: 1;
    color: ${colors.shark};

    ::placeholder {
        color: ${colors.boulder};
    }
`;
