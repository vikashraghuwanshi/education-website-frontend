import ReactPlayer from 'react-player';
import React, { useRef } from 'react';
import "./PlayerComponent.css"


function PlayerComponent(props) {
   const playerRefs = useRef(null);

   return (
      <div className='video-player'>
         <ReactPlayer style={{ cursor: 'pointer' }} ref={playerRefs} url={props.url} controls={true} playing={props.isCurrentVideoPlaying}
                     onPlay={props.onPlay} onPause={props.onPause} onEnded={props.onEnded}/>
         <h3 className="title">{props.title}</h3>
      </div>
   )
};
export default PlayerComponent;