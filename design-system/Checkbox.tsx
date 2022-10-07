import React from 'react';
import { styled, CSS, VariantProps } from '../../styles';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import IconCheck from '../images/IconCheck';
import { CheckIcon } from '@radix-ui/react-icons';

const StyledCheckbox = styled(CheckboxPrimitive.Root, {
    all: 'unset',
    boxSizing: 'border-box',
    userSelect: 'none',
    '&::before': {
        boxSizing: 'border-box',
    },
    '&::after': {
        boxSizing: 'border-box',
    },

    alignItems: 'center',
    appearance: 'none',
    display: 'inline-flex',
    justifyContent: 'center',
    lineHeight: '1',
    margin: '0',
    outline: 'none',
    padding: '0',
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    cursor: 'pointer',
    color: '$black',
    border: '1px solid $black',

    overflow: 'hidden',
    '@hover': {
        '&:hover': {
            boxShadow: 'inset 0 0 0 1px $colors$slate8',
        },
    },
    '&:focus': {
        outline: 'none',
        borderColor: '$red7',
        boxShadow: 'inset 0 0 0 1px $purple, 0 0 0 1px $purple',
    },

    variants: {
        size: {
            '1': {
                width: '$3',
                height: '$3',
                borderRadius: '$1',
            },
            '2': {
                width: '$5',
                height: '$5',
                borderRadius: '$2',
            },
        },
    },
    defaultVariants: {
        size: '1',
    },
});

const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
});

type CheckboxPrimitiveProps = React.ComponentProps<typeof CheckboxPrimitive.Root>;
type CheckboxVariants = VariantProps<typeof StyledCheckbox>;
type CheckboxProps = CheckboxPrimitiveProps & CheckboxVariants & { css?: CSS };

const Checkbox = React.forwardRef<React.ElementRef<typeof StyledCheckbox>, CheckboxProps>(
    (props, forwardedRef) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <StyledCheckbox {...props} ref={forwardedRef} checked={props.value}>
                <StyledIndicator>
                    {/* <IconCheck /> */}
                    <CheckIcon />
                </StyledIndicator>
            </StyledCheckbox>
            &nbsp;&nbsp;
            <label htmlFor={props.id} style={{ cursor: 'pointer' }}>{props.label}</label>
        </div>

    )
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;