import { ComponentProps, ReactNode } from 'react';
import { InputWrapper, Input as StyledInput } from './services/styled';

const Input = ({
    icon,
    className,
    ...inputProps
}: { icon: ReactNode } & ComponentProps<typeof StyledInput>) => (
    <InputWrapper className={className}>
        {icon}
        <StyledInput {...inputProps} />
    </InputWrapper>
);

export default Input;
