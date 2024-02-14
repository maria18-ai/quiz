import { useContext } from 'react';
import { QuizContext } from '../context/quiz';
import Options from './Options';

import './Question.css';

function Question() {
    const [quizState, dispatch] = useContext(QuizContext);

    // acessando a pergunta no indice atual 
    const currentQuestion = quizState.questions[quizState.currentQuestion]

    return (
        <div id='question'>
            <p>Pergunta {quizState.currentQuestion + 1} de {quizState.questions.length}</p>
            <h2>{currentQuestion.question}</h2>
            <div id="options-container">
                {currentQuestion.options.map((option) => (
                    <Options option={option} key={option}/>
                ))}
            </div>
            <button onClick={() => dispatch({type: "CHANGE_QUESTION"})}>Continuar</button>
        </div>
    )
}

export default Question