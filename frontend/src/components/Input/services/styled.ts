import styled from 'styled-components';
import colors from '../../../colors';
import iconSizes from '../../../iconSizes';

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

export const Input = styled.input<{ isFullwidth?: boolean }>`
    border: 1px solid ${colors.lightGray};
    border-radius: 4px;
    height: 40px;
    color: ${colors.dark};
    width: ${({ isFullwidth }) => (isFullwidth ? '100%' : '300px')};

    ::placeholder {
        color: ${colors.grey};
    }
`;
