import React from 'react'
import { styled } from '../styles'
import ChatWidget from './ChatWidget'
import Navbar from './Navbar'

const PageLayout = ({children}) => {
  return (
    <StyledGrid>
       <section>
          <Navbar/>
          {children}
       </section>
        <ChatWidget/>
    </StyledGrid>
  )
}

export default PageLayout


const StyledGrid = styled('section',{
    display:'grid',
    gridTemplateColumns:'1fr 400px',
    height: '100vh',
    maxHeight: '100vh',
    overflowY: 'hidden',

    '& :first-child':{
        overflowY: 'scroll',
    }
})