import React, { useState } from 'react';
import "./Section.css"
import PlayerComponent from './PlayerComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { sectionData } from '../data/section_data'


function Section(props) {

    const [isCurrentVideoPlaying, setIsCurrentVideoPlaying] = useState(true);


    const onPlay = () => {
        // setIsCurrentVideoPlaying(true);
    };

    const onPause = () => {
        // setIsCurrentVideoPlaying(false);
    };

    const onEnded = () => {
        setIsCurrentVideoPlaying(false);
    };

   return (
      <>
        <div className="section-container">
            <div className="video-playlist">
                {sectionData[props.section_id-1].map((item, id) => {
                    return (
                        <>
                    <button className='playlist-button' 
                        onClick={()=> {
                            let updatedUrls = [null, null, null, null, null, null]
                            updatedUrls[props.section_id-1]=item.url
                            if(updatedUrls[props.section_id-1] === props.url[props.section_id-1]) {
                                setIsCurrentVideoPlaying(!isCurrentVideoPlaying);
                            } else {
                                setIsCurrentVideoPlaying(true);
                            }
                            props.setUrl(updatedUrls)

                            let updatedTitle = [null, null, null, null, null, null]
                            updatedTitle[props.section_id-1]=item.title
                            props.setTitle(updatedTitle)

                            let updatedVideoPlaying = [-1, -1, -1, -1, -1, -1]
                            updatedVideoPlaying[props.section_id-1]=id
                            props.setVideoPlaying(updatedVideoPlaying) }}>

                        <div className='play-pause-icon'>
                            <FontAwesomeIcon icon={ isCurrentVideoPlaying && props.videoPlaying[props.section_id-1] === id ? faPause : faPlay } />
                        </div>
                        <span>{item.title} </span>
                    </button>
                    </>
                    );
                })}
                
            </div>

            <div className="main-video">
                <PlayerComponent url={props.url[props.section_id-1]} title={props.title[props.section_id-1]}
                        onPlay={onPlay} onPause={onPause} isCurrentVideoPlaying={isCurrentVideoPlaying}
                        onEnded={onEnded}/>
            </div>
        </div>
      </>
   )
};
export default Section;