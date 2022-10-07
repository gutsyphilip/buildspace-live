import React from 'react'
import { styled } from '../styles'
import Container from './Container'

const Footer = () => {
    return (
        <StyledContainer>
            <p>Made with 🩸blood and 💦sweat by <a href="https://twitter.com/gutsyphilip" target="_blank" rel='noreferrer'>@gutsyphilip</a></p>
        </StyledContainer>
    )
}

export default Footer

const StyledContainer = styled('footer', Container, {
    marginTop: '$8',
    marginBottom: '$3',

    '& > a': {
        textDecoration: 'underline'
    }
    // '@bp1': {
    //     position: 'fixed',
    //     bottom: '$3',
    //     left: 0,
    // }
})