import React from 'react'
import * as RadixDialog from '@radix-ui/react-dialog';
import { keyframes, styled } from '../styles';
import { X } from 'react-feather';

const Flyout: React.FC<any> = ({ children, ttl, desc, ...props }) => {
    return (
        <StyledRoot onOpenChange={(value) => (props.setOpen(value))} {...props}>
            <RadixDialog.Portal>
                <StyledOverlay />
                <StyledContent>
                    <StyledContentBody>
                        <StyledContentHeader>
                            <StyledTitle>{ttl}</StyledTitle>
                            <RadixDialog.Description>{desc}</RadixDialog.Description>
                            <StyledCloseBtn>
                                <X />
                            </StyledCloseBtn>
                        </StyledContentHeader>
                        {children}
                    </StyledContentBody>
                    <StyledContentFooter>
                        {props?.renderFooter?.()}
                    </StyledContentFooter>
                </StyledContent>
            </RadixDialog.Portal>
        </StyledRoot>
    )
}

export default Flyout


const overlayShow = keyframes({
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
})

const contentShow = keyframes({
    // '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
    // '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
    '0%': { marginRight: '-100%' },
    '100%': { marginRight: 0 },
})


const StyledRoot = styled(RadixDialog.Root, {
    position: 'relative',
})

const StyledOverlay = styled(RadixDialog.Overlay, {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    inset: 0,
    backgroundColor: 'rgba(0,0,0,.1)',
    // backdropFilter: 'blur(1px)',
    '@media (prefers-reduced-motion: no-preference)': {
        animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
    },
    zIndex: '1001',
});

const StyledContent = styled(RadixDialog.Content, {
    position: 'fixed',
    // overflow: 'hidden',
    top: '0px',
    right: '0px',
    bottom: '4px',
    // borderRadius: '15px',
    border: '1px solid $borderBgColor',
    width: '90vw',
    maxWidth: '700px',
    minWidth: 200,
    height: 'calc(100vh)',
    willChange: 'transform',
    backgroundColor: 'white',
    borderLeft: '1px solid $borderBgColor',
    display: 'flex',
    flexDirection: 'column',
    // boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
    '@media (prefers-reduced-motion: no-preference)': {
        animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
    },
    '&:focus': { outline: 'none' },

    // apps/main Navbar is at 1000
    zIndex: '1001',
});

const StyledContentHeader = styled('header', {
    marginBottom: '$5',
})


const StyledTitle = styled('h3', {})

const StyledCloseBtn = styled(RadixDialog.Close, {
    appearance: 'none',
    backgroundColor: '$bgLightColor',
    border: "1.5px solid $borderBgColor",
    borderRadius: "$round",
    float: "right",
    padding: "$1",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed !important",
    left: '-$3',
    top: '$4',
    zIndex: '9999',

    '& > svg': {
        width: "16px",
        height: "16px",
    }
})

const StyledContentBody = styled('main', {
    marginBottom: '$8',
    overflowY: 'scroll',
    padding: '$4 $4',
})


const StyledContentFooter = styled('footer', {
    position: 'absolute',
    width: '100%',
    bottom: '0',
    left: '0',
    // borderTop: '1px solid $borderBgColor',
    padding: '$2 $4',
    backgroundColor: '$bgColor',
    zIndex: '9999',
})



