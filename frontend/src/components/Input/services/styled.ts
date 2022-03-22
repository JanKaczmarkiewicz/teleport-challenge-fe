import styled from 'styled-components';
import colors from '../../../styleTokens/colors';
import iconSizes from '../../../styleTokens/iconSizes';

const PADDING_LEFT = '8px';

export const InputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;

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

export const Input = styled.input<{ isFullWidth?: boolean }>`
    border: 1px solid ${colors.iron};
    border-radius: 0.25rem;
    height: 40px;
    color: ${colors.shark};
    width: ${({ isFullWidth }) => (isFullWidth ? '100%' : '300px')};

    ::placeholder {
        color: ${colors.boulder};
    }
`;
