import Footer from './Footer'
import Accordion from './Accordion'
import './Home.css'
import { useState } from 'react';
import { sections } from '../data/sections'


function Home() {

    const [url, setUrl] = useState([null, null, null, null, null, null]);
    const [title, setTitle] = useState([null, null, null, null, null, null]);
    const [videoPlaying, setVideoPlaying] = useState([-1, -1, -1, -1, -1, -1]);

    return (
        <>
        <div>
            <span className='class-title'>Class 4:</span>
            <h1 className='chapter-title'>Chapter 6 : Geometry and measurement</h1>
            {sections.map((section, id) => {
              return (
                <>
                   <Accordion id={id+1} chapterName={section}
                        url={url} setUrl={setUrl}
                        title={title} setTitle={setTitle} 
                        videoPlaying={videoPlaying} setVideoPlaying={setVideoPlaying}/>
                </>
              );
            })}

        </div>
        <Footer/>
      </>
    )
}

export default Home;