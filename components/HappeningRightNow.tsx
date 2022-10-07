import React from 'react'
import { styled } from '../styles'
import { STREAM_PLAYBACK_URL } from '../utils/config'
import IVSPlayer from './IVSPlayer'

const HappeningRightNow = () => {
  return (
    <StyledContainer>
        <header>
            <h1 className='ttl'>Happening Right Now</h1>
        </header>
        <StyledGrid>
          <IVSPlayer src={STREAM_PLAYBACK_URL} handleQuizEvent={() => { }} />
          <div>
            Chat stuff goes here.
          </div>
        </StyledGrid>
    </StyledContainer>
  )
}

export default HappeningRightNow

const StyledContainer = styled('section', {
    my: '$10',
    '& > header':{
        mb: '$5',
    }

})

const StyledGrid = styled('section',{
    display:'grid',
    gridTemplateColumns:'1fr 400px',
    gap:'$6'
})