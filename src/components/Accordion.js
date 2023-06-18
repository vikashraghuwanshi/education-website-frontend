// import React, {useState, useEffect, useRef} from 'react'
// import "./Accordion.css"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
// import Section from './Section'
// import { Link } from 'react-router-dom'
// import { sectionText } from '../data/section_text'


// export default function Accordion(props) {

//     const [toggle, setToggle] = useState(false)
//     const [heightEl, setHeightEl] = useState();
    

//     const refHeight = useRef()

//     useEffect(() => {
//         // console.log(refHeight);
//         if(toggle) setHeightEl(`${refHeight.current.scrollHeight + 20}px`)
//         else setHeightEl('0px')
//     }, [toggle, props.id])

//     const toggleState = () => {
//         setToggle(!toggle)
//     }

//     const accordionStyle = {
//         zIndex: toggle ? 1 : 0, // Set a higher z-index for the expanded accordion
//       };
    

//     // console.log(toggle);
//     return (
//         <div className="accordion" style={{ background: 'red' }}>

//             <button 
//             onClick={toggleState}
//             className="accordion-visible">
//                 <span>Section {props.id} : {props.chapterName} </span>
//                 <FontAwesomeIcon icon={faChevronRight} rotation={toggle ? 90 : 0} size="xl" style={{color: "#f5f7f9",}} />
//                 </button>
            
//             <div 
//             className={toggle ? "accordion-toggle animated" : "accordion-toggle"}
//             style={{height: toggle ? `${heightEl}` : "0px"}}
//             ref={refHeight}
//             >
//                 <p aria-hidden={toggle ? "true" : "false"}>
//                     {sectionText[props.id+'']}
//                 </p>
//                 <div>
//                     <Section section_id={props.id} url={props.url} setUrl={props.setUrl}
//                                 title={props.title} setTitle={props.setTitle}
//                                 videoPlaying={props.videoPlaying} setVideoPlaying={props.setVideoPlaying}/>
//                 </div>

//                 <div className='divs'>
//                     <Link to='/quiz'>
//                         <button className='quiz-button'>Start Quiz</button>
//                     </Link>
//                 </div>
//             </div>
            
//         </div>
//     )
// }