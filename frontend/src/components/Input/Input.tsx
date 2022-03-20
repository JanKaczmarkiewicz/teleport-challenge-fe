import { ComponentProps, ReactNode } from 'react';
import { InputWrapper, Input as StyledInput } from './services/styled';

const Input = ({
    icon,
    ...inputProps
}: { icon: ReactNode } & ComponentProps<typeof StyledInput>) => (
    <InputWrapper>
        {icon}
        <StyledInput {...inputProps} />
    </InputWrapper>
);

export default Input;
