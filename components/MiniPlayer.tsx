import React from 'react'
import {
  create,
  ErrorType,
  isPlayerSupported,
  MediaPlayer,
  PlayerError,
  PlayerEventType,
  PlayerState,
  Quality,
  TextCue,
  TextMetadataCue,
} from 'amazon-ivs-player';

import wasmBinaryPath from 'amazon-ivs-player/dist/assets/amazon-ivs-wasmworker.min.wasm';
import wasmWorkerPath from 'amazon-ivs-player/dist/assets/amazon-ivs-wasmworker.min.js';

export interface MiniPlayerProps {
  src?: string;
}

const MiniPlayer:React.FC<MiniPlayerProps> = (props) => {
  let videoRef = React.useRef<HTMLVideoElement>(null)
  if (!isPlayerSupported) {
    throw new Error('IVS Player is not supported in this browser');
  }

  /**
   * Web Workers and WASM Workers need to be created via URL. Webpack has created the relative URL for us via file-loader,
   * now we just have to create the absolute (fully qualified) URL.
   */
  const createAbsolutePath = (assetPath: string) =>
    new URL(assetPath, document.URL).toString();

  const player: MediaPlayer= create({
    wasmWorker: createAbsolutePath(wasmWorkerPath),
    wasmBinary: createAbsolutePath(wasmBinaryPath),
  });

  React.useEffect(()=>{
    player.attachHTMLVideoElement(videoRef.current);
    player.load(props.src);
    player.play();
    
  },[])

  return (
    <div>
      <video ref={videoRef} playsInline></video>
    </div>
  )
}

export default MiniPlayer