import React, { useState } from 'react';
import "./Section.css"
import PlayerComponent from './PlayerComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { sectionData } from '../data/section_data'


function Section(props) {
   
    const [url, setUrl] = useState(null);
    const [title, setTitle] = useState(null);
    const [isPlayingFirst, setIsPlayingFirst] = useState(false);
    const [isPlayingSecond, setIsPlayingSecond] = useState(false);
    const [isPlayingThird, setIsPlayingThird] = useState(false);

   return (
      <>
        <div class="container">
            <div class="video-playlist">
                {sectionData[props.section-1].map((item) => {
                    return (
                        <>
                    <button className='playlist-button' 
                        onClick={()=> {
                            setUrl(item.url)
                            setTitle(item.title)
                            setIsPlayingFirst(true)
                            setIsPlayingSecond(false)
                            setIsPlayingThird(false)}}>
                        <div className='play-pause-icon'>
                            <FontAwesomeIcon icon={ isPlayingFirst ? faPause : faPlay } />
                        </div>
                        <span>{item.title} </span>
                    </button>
                    </>
                    );
                })}
                
            </div>

            <div class="main-video">
                <PlayerComponent url={url} title={title}/>
            </div>
        </div>
      </>
   )
};
export default Section;