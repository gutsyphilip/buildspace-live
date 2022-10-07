import { useRef } from 'react';
import { useEffect } from 'react';

import IVSPlayer from '../components/IVSPlayer';
import Container from '../design-system/Container';
import useScript from '../hooks/useScript';
import { styled } from '../styles';




import type { NextPage } from 'next'
import HappeningRightNow from '../components/HappeningRightNow';

const Home: NextPage = () => {

  // Load IVS tech
  const { loading, error } = useScript({
    src: "https://player.live-video.net/1.2.0/amazon-ivs-videojs-tech.min.js",
  });
  // Load IVS quality plugin
  const { loading: loadingPlugin, error: pluginError } = useScript({
    src: "https://player.live-video.net/1.2.0/amazon-ivs-quality-plugin.min.js",
  });

  if (loading || loadingPlugin) {
    return <p>loading ivs videojs tech and plugins...</p>;
  }

  if (error || pluginError) {
    return <p>Error!</p>;
  }


  return (
    <HomeWrapper>
      <StyledHeader>
        <h1 className='ttl'>Where builders build with friends.</h1>
      </StyledHeader>
      <HappeningRightNow /> 
    </HomeWrapper>
  )
}

export default Home

const HomeWrapper = styled('section', Container, {
  
})




const StyledHeader = styled('section', {
  my: '$10',

  '& > .ttl':{
    fontSize:'$display1'
  }
})



