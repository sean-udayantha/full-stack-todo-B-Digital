import { forwardRef } from 'react';
import { TextField, type TextFieldProps } from '@mui/material';

type FormFieldProps = Omit<TextFieldProps, 'error'> & {
  error?: string;
  optional?: boolean;
};

export const FormField = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormFieldProps>(function FormField(
  { label, optional, error, slotProps, ...props }, ref,
) {
  return (
    <TextField
      {...props}
      inputRef={ref}
      label={optional ? `${label} (optional)` : label}
      error={Boolean(error)}
      helperText={error}
      slotProps={{ ...slotProps, formHelperText: { role: error ? 'alert' : undefined } }}
    />
  );
});
