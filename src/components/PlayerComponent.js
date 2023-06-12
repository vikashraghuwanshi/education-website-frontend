import ReactPlayer from 'react-player';
import React, { useRef } from 'react';
import "./PlayerComponent.css"


function PlayerComponent(props) {
   const playerRefs = useRef(null);

   return (
      <div className='video-player'>
         <ReactPlayer ref={playerRefs} url={props.url} controls={true} playing={true}/>
         <h3 class="title">{props.title}</h3>
      </div>
   )
};
export default PlayerComponent;