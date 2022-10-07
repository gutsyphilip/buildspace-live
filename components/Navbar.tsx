import Link from 'next/link'
import React from 'react'
import Container from '../design-system/Container'
import { styled } from '../styles'

const Navbar = () => {
  return (
    <StyledContainer>
        <Link href="/">
            <a>
                <h2>buildspace.tv</h2>
            </a>
        </Link>
    </StyledContainer>
  )
}

export default Navbar

const StyledContainer = styled(Container,{
    py: '$5'
})

