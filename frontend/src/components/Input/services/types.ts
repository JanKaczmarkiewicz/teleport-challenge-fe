import { InputHTMLAttributes, ReactNode } from 'react';

export type InputProps = {
    icon?: ReactNode;
    isFullWidth?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;
