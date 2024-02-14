import { useContext, useEffect } from 'react'
import { QuizContext } from './context/quiz'

// components
import Question from './components/Question'
import Welcome from './components/Welcome'
import GameOver from './components/GameOver'

// estilo
import './App.css'


function App() {

  const [quizState, dispatch] = useContext(QuizContext);

  useEffect(() => {
    // embaralhando as perguntas 
    dispatch({type: "REORDER_QUESTIONS"})
  }, [])

  return (
    <div className='App'>
    <h1>Quiz One Piece</h1>
      {quizState.gameStage === "Start" && <Welcome />}
      {quizState.gameStage === "Playing" && <Question />}
      {quizState.gameStage === "End" && <GameOver />}
    </div>
  )
}

export default App
