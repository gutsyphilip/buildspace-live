import * as React from 'react';
import { styled } from '../styles';

export enum InputVariant {
  Primary = 'primary',
  PrimaryOutline = 'primary-outline',
}

export interface InputProps
  extends React.InputHTMLAttributes<any>,
  React.TextareaHTMLAttributes<any> {
  label?: string;
  variant?: InputVariant;
  className?: string;
  errorText?: string;
  warningText?: string;
  helperText?: string;
  isMultiline?: boolean;
  field?: any
  form?: any
  meta?: any
}

const StyledInput = styled('input', {
  width: '100%',
  minHeight: '50px',
  display: 'flex',
  outline: 'none',
  fontSize: '14px',
  lineHeight: '16px',
  position: 'relative',
  borderRadius: '$2',
  border: '1.5px solid $borderBgColor',
  // background: '$bgLightColor',
  padding: '12px 20px',
  ai: 'center',
  boxSizing: ' border-box',
  jc: 'center',

  variants: {
    error: {
      true: { border: '1px solid red' },
    },

    warning: {
      true: { border: '1px solid orange' },
    },

    multiline: {
      true: {
        resize: 'none', height: 'auto', lineHeight: '150% !important',
        borderRadius: '$2',
      },
    },
  },
});

const Label = styled('label', {
  display: 'block',
  mb: '6px',
  fontSize: '$body3',
  color: '$black',
});

const InputContainer = styled('div', {
  position: 'relative',
});

const InputHelper = styled('span', {
  marginTop: '6px',
  display: 'inline-block',
  fontSize: '12px',
  lineHeight: '$3',
});

export const Input: React.FC<InputProps> = ({
  label,
  variant,
  errorText,
  className,
  helperText,
  isMultiline,
  warningText,
  field,
  ...props
}) => {
  return (
    <InputContainer>
      <Label htmlFor={props.id}>{label}</Label>
      {isMultiline ? (
        // @ts-ignore
        <StyledInput
          as='textarea'
          variant={variant}
          error={errorText}
          multiline={isMultiline}
          warning={warningText}
          className={className}
          {...field}
          {...props}

        />
      ) : (
        // @ts-ignore
        <StyledInput
          variant={variant}
          error={errorText}
          warning={warningText}
          className={className}
          {...field}
          {...props}
        />
      )}
      {(errorText || warningText || helperText) && (
        <InputHelper>{errorText || warningText || helperText}</InputHelper>
      )}
    </InputContainer>
  );
};

Input.defaultProps = {
  type: 'text',
  isMultiline: false,
};

export default Input;
