import React, { useState } from 'react'
import './Quiz.css'
import { quizData } from '../data/quizdata'
import QuizResult from './QuizResult';

function Quiz() {

  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const tryAgain = () => {
    setScore(0);
    setCurrentQuestion(0);
    setSelectedOption(0);
    setShowResult(0);
  }

  return (
    <div className="quiz-body">
      <div className="quiz-title">Quiz</div>
      <div className="quiz-container">
        {showResult ? <QuizResult score={score} total={quizData.length} tryAgain={tryAgain}/> : (
          <>
          <div className="question-container">
            <span className="question">{currentQuestion+1}. {quizData[currentQuestion].question}</span>
          </div>

          {console.log(quizData)}

          {quizData[currentQuestion].options.map((data, id) => {
            return <div className="option-container question">
                      <button class={selectedOption === id+1 
                      ? "colored-option-button" : "option-button"}
                      onClick={()=>{
                        setSelectedOption(id+1);
                      }}
                      >{data}</button>
                  </div>
          })}

          <div className="next-button-container">
            <button className="next-button"
              onClick={()=>{
                if(selectedOption === quizData[currentQuestion].answer) {
                  setScore(score+1)
                }
                quizData.length !== currentQuestion+1 ?
                setCurrentQuestion(currentQuestion+1) : setShowResult(true)
                setSelectedOption(0)
              }}
              disabled={selectedOption === 0}>Next</button>
          </div>
          </>
        )}

      </div>
    </div>
  )
}

export default Quiz