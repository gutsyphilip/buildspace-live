import React from 'react';

import { styled } from '../styles';
import { STREAM_PLAYBACK_URL } from '../utils/config';
import IVSPlayer from './IVSPlayer';

const HappeningRightNow = () => {
  return (
    <StyledContainer>
      <header>
        <h1 className='ttl'>Happening Right Now 🔥</h1>
      </header>
      <IVSPlayer src={STREAM_PLAYBACK_URL} />
    </StyledContainer>
  )
}

export default HappeningRightNow

const StyledContainer = styled('section', {
  my: '$6',
  '& > header': {
    mb: '$5',
  },
})