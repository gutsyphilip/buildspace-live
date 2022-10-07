// import MiniPlayer from '../components/MiniPlayer';
import styles from '../styles/Home.module.css';
// import { CONTROLS, POSITION } from '../utils/config';
// import * as IVSPlayer from "amazon-ivs-player"
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

import IVSPlayer from '../components/IVSPlayer'



import type { NextPage } from 'next'
import { useRef } from 'react';
import { useEffect } from 'react';
import useScript from '../hooks/useScript';

const STREAM_PLAYBACK_URL = 'https://e267f446b797.us-east-1.playback.live-video.net/api/video/v1/us-east-1.079102459196.channel.FPTK2dOqPnG2.m3u8';

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
    <div className={styles.container}>
      <header>
        <h1>Buildspace TV</h1>
      </header>
      <div className="App">
      {/* <video ref={videoEl} playsInline></video> */}
      {/* <MiniPlayer
        streamUrl={STREAM_PLAYBACK_URL}
        controls={[CONTROLS.resize, CONTROLS.close, CONTROLS.mute]}
        position={POSITION.bottomRight}
        transition
      />

      {[...Array(20)].map((_, i) => (
        <div className="App-contentPlaceholder" key={i} />
        
      ))} */}
       <IVSPlayer src={STREAM_PLAYBACK_URL} handleQuizEvent={()=>{}} />
    </div>
    </div>
  )
}

export default Home




