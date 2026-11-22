import { forwardRef } from 'react';
import { Button as MuiButton, type ButtonProps as MuiButtonProps } from '@mui/material';

type ButtonProps = Omit<MuiButtonProps, 'variant'> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', type = 'button', color, ...props }, ref,
) {
  const muiVariant = variant === 'secondary' ? 'outlined' : variant === 'ghost' ? 'text' : 'contained';
  return <MuiButton
    ref={ref}
    type={type}
    variant={muiVariant}
    color={variant === 'danger' ? 'error' : color ?? 'primary'}
    {...props}
  />;
});
