import React from 'react'
import './QuizResult.css'

function QuizResult(props) {
  return (
    <>
        <div className="score-heading">
            Your Score : {props.score}/{props.total}
        </div>
        <div className="try-again-button-container">
            <button className="try-again-button"
              onClick={()=>props.tryAgain()}>Try Again</button>
          </div>
    </>
  )
}

export default QuizResult
