import { InputWrapper, Input as StyledInput } from './services/styled';
import { InputProps } from './services/types';

const Input = ({ icon, className, isFullWidth, ...inputProps }: InputProps) => (
    <InputWrapper className={className} isFullWidth={isFullWidth}>
        {icon}
        <StyledInput {...inputProps} />
    </InputWrapper>
);

export default Input;
