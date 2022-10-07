import React from 'react'
import { styled } from '../styles'
import ChatWidget from './ChatWidget'
import Navbar from './Navbar'

const PageLayout = ({ children }) => {
  return (
    <StyledGrid>
      <section>
        <Navbar />
        {children}
      </section>
      <ChatWidget />
    </StyledGrid>
  )
}

export default PageLayout


const StyledGrid = styled('section', {
  display: 'grid',
  gridTemplateColumns: '1fr',

  '@bp2': {
    gridTemplateColumns: '1fr 500px',
    height: '100vh',
    maxHeight: '100vh',
    overflowY: 'hidden',
  },

  '& > *': {
    height: 'fit-content'
  },

  '& > :first-child': {
    overflowY: 'scroll',
  },

  '& > :last-child': {
    height: 'fit-content',
    '@bp2': {
      height: '100vh',
    }
  }
})