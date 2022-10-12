import { VideoJSEvents, VideoJSIVSTech, VideoJSQualityPlugin } from 'amazon-ivs-player';
import Head from 'next/head';
import React, { useEffect } from 'react';
import videojs from 'video.js';

import { styled } from '../styles';


export interface IVSPlayerProps {
  src: string;
}

const IVSPlayer = ({ src }: IVSPlayerProps) => {
  useEffect(() => {
    const PLAYBACK_URL = src;

    window.registerIVSTech(videojs);
    window.registerIVSQualityPlugin(videojs);

    const player = videojs(
      "amazon-ivs-videojs",
      {
        techOrder: ["AmazonIVS"],
        autoplay: true,
      },
      () => {
        console.log("IVS Player is READY!");
        player.src(PLAYBACK_URL);
      }
    ) as videojs.Player & VideoJSIVSTech & VideoJSQualityPlugin;

    player.enableIVSQualityPlugin();


    const events: VideoJSEvents = player.getIVSEvents();
    const ivsPlayer = player.getIVSPlayer();


    ivsPlayer.addEventListener(events.PlayerState.PLAYING, () => {
      console.log("IVS Player is PLAYING");
    });

    ivsPlayer.addEventListener(events.PlayerState.IDLE, () => {
      console.log("IVS Player is IDLE");
    });

    ivsPlayer.addEventListener(events.PlayerState.BUFFERING, () => {
      console.log("IVS Player is BUFFERING");
    });

    ivsPlayer.addEventListener(events.PlayerState.ENDED, () => {
      console.log("IVS Player is ENDED");
    });


    ivsPlayer.addEventListener(
      events.PlayerEventType.TEXT_METADATA_CUE,
      function (cue) {
        console.log(cue);
        console.log("Timed metadata: ", JSON.parse(cue.text));
      }
    );

    player.on("error", () => {
      console.log(player.error());
    });
    ivsPlayer.addEventListener(events.PlayerEventType.ERROR, (payload) => {
      const { type, code, source, message } = payload;
      console.log(type, code, source, message);
      //  alert(message);
    });
  }, [src]);

  return (
    <>
      <Head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/video.js/7.6.6/video-js.css"
          rel="stylesheet"
        />
      </Head>
      <StyleVideo
        id="amazon-ivs-videojs"
        className="video-js vjs-16-9 vjs-big-play-centered"
        controls
        autoPlay
        playsInline
      ></StyleVideo>
    </>
  );
}

export default IVSPlayer;

const StyleVideo = styled('video', {
  background: '$bgLightColor'
})