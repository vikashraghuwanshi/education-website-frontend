import Footer from './Footer'
import Accordion from './Accordion'
import './Home.css'


function Home() {


    return (
        <>
        <div>
            <span className='class-title'>Class 4:</span>
            <h1 className='chapter-title'>Chapter 6 : Geometry and measurement</h1>
            <Accordion id={1} chapterName={'Length'} />
            <Accordion id={2} chapterName={'Volume'} />
            <Accordion id={3} chapterName={'Mass'} />
            <Accordion id={4} chapterName={'Time'} />
            <Accordion id={5} chapterName={'Perimeter'} />
            <Accordion id={6} chapterName={'Area'} />
        </div>
        <Footer/>
      </>
    )
}

export default Home;