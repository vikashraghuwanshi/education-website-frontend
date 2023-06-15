import Footer from './Footer'
// import Accordion from './Accordion'
import './Home.css'
import "./Accordion.css"
import React, { useRef, useState } from 'react';
import { sections } from '../data/sections'

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import AccordionSummary from "@material-ui/core/AccordionSummary";

import Section from './Section'
import { Link } from 'react-router-dom'
import { sectionText } from '../data/section_text'


function Home() {

    const [url, setUrl] = useState([null, null, null, null, null, null]);
    const [title, setTitle] = useState([null, null, null, null, null, null]);
    const [videoPlaying, setVideoPlaying] = useState([-1, -1, -1, -1, -1, -1]);

    const [expanded, setExpanded] = useState(false);
    const refs = {
      'panel1': useRef(null),
      'panel2': useRef(null),
      'panel3': useRef(null),
      'panel4': useRef(null),
      'panel5': useRef(null),
      'panel6': useRef(null),
    };


    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
      if (isExpanded) {
        setTimeout(() => {
          refs[panel].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }
    };

    return (
      <React.Fragment>
        <div className='home'>
            <span className='class-title'>Class 4:</span>
            <h1 className='chapter-title'>Chapter 6 : Geometry and measurement</h1>
            {sections.map((section, id) => {
              return (
                <React.Fragment key={id}>
                  <Accordion style={{ marginTop: '3px' }}
                    expanded={expanded === `panel${id+1}`} onChange={handleChange(`panel${id+1}`)}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                          >
                            <Typography
                              className='accordion-visible-section-number'
                            >
                            <span style={{ fontSize: '25px' }}>{id+1}. </span>
                            </Typography>
                            <Typography
                              className='accordion-visible'
                              style={{ marginTop: '10px' }}
                            >
                              <span style={{ fontSize: '25px', paddingRight: '30px' }}>{section} </span>
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails style={{ display: 'flex',
                                    flexDirection: 'column', alignItems: 'center'
                                     }}>
                            <Typography ref={refs[`panel${id+1}`]} className='animated'>
                              
                              <span style={{ maxWidth: '90%', marginTop: '6.25%',
                                          fontSize: '20px', marginLeft: '6.25%' }}
                                    >{sectionText[id+1+'']}</span>

                              <div>
                                  <Section section_id={id+1} url={url} setUrl={setUrl}
                                              title={title} setTitle={setTitle}
                                              videoPlaying={videoPlaying} setVideoPlaying={setVideoPlaying}/>
                              </div>


                            <div className='divs'>
                                <Link to='/quiz'>
                                    <button className='quiz-button'>Start Quiz</button>
                                </Link>
                            </div>

                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                </React.Fragment>
              )
            })}

        </div>
        <Footer/>
      </React.Fragment>
    )
}

export default Home;