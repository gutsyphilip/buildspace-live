import * as React from 'react'
import { styled } from '../styles';
import Spinner from './Spinner';


export type ButtonVariants = 'primary' | 'secondary' | 'outline' | 'danger' | 'success' | 'warning' | 'info' | 'light' | 'dark' | 'theme';

export type ButtonSizes = 'XL' | 'L' | 'M' | 'S'

export interface ButtonProps {
    loading?: boolean;
    variant: ButtonVariants;
    size: ButtonSizes;
    as?: any
    children: React.ReactNode
}


const StyledButton = styled('button', {
    // Reset
    all: 'unset',
    boxSizing: 'border-box',
    userSelect: 'none',
    '&::before': {
        boxSizing: 'border-box',
    },
    '&::after': {
        boxSizing: 'border-box',
    },

    // Custom reset?
    flexShrink: 0,
    lineHeight: '1',
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    minHeight: '40px',
    position: 'relative',

    // Custom
    jc: 'center',
    bc: '$white',
    fontSize: '$body1',
    width: 'fit-content',
    borderRadius: '$2',
    // borderRadius: '$2',
    cursor: 'pointer',
    transition: '.25s cubic-bezier(.49,.11,.6,1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',


    '& span': {
        width: '100%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600,
        lineHeight: '1.5',
    },


    '&:hover': {
        // boxShadow: '0px 5px 10px 2px rgb(0 0 0 / 12%)',
    },

    '&:disabled': {
        bc: '$grayDark',
        boxShadow: 'inset 0 0 0 1px $colors$slate7',
        color: '#666',
        cursor: "not-allowed",
        pointerEvents: 'none',
    },

    variants: {
        size: {
            'S': {
                fontSize: '$body3',
                p: '$2 $3',
            },
            'M': {
                fontSize: '$body2',
                p: '$3 $4',
            },
            'L': {
                fontSize: '18px',
                p: '$3 $4',
            },
            'XL': {
                p: '$4 $5',
                fontSize: '20px',
            },
        },

        variant: {
            danger: {
                bc: '$red',
                color: '$white',
                '&:hover': {},
                '&:active': {
                    bc: '$slate2',
                },
                '&:focus': {},
                '&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]':
                {
                    // bc: '$slate4',
                },
            },

            primary: {
                bc: '$btnPrimaryBg',
                color: '$btnPrimaryFg',
                '&:hover': {},
                '&:active': {

                },
                '&:focus': {},
                '&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]':
                {

                },
            },

            secondary: {
                bc: '$bgColor',
                '& span': {
                    color: '$fgColor !important',
                },

            },

            outline: {
                color: '$black',
                bc: 'transparent',
                border: '1.5px inset $fgColor',


                '&:hover': {
                    transform: 'none',
                    boxShadow: 'none',
                    borderColor: '$black',
                },
            },

            theme: {
                bc: '$brandOrange',
                color: '$white',
            }
        },

        loading: {
            true: {
                cursor: 'progress',
                pointerEvents: 'none'
            },
        }
    },

    defaultVariants: {
        size: 'M',
        variant: 'primary',
    },
});

const Button: React.FC<any> = React.forwardRef<React.ElementRef<typeof StyledButton>, any>(
    ({ children, ...props }, forwardedRef) => {
        return (
            <StyledButton ref={forwardedRef} {...props} >
                {props.loading && <Spinner style={{ position: "absolute", top: 'calc(50% - 9px)', left: "calc(50% - 9px)" }} size={18} />}
                <span style={{ visibility: props.loading ? 'hidden' : 'visible' }}>
                    {children}
                </span>
            </StyledButton>
        );
    }
);

Button.displayName = "Button"
Button.toString = () => '.button';

export default Button
