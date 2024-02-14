import './Welcome.css'
import logoOP from '../img/luffy-banner2.webp';

import { useContext } from 'react';
import { QuizContext } from '../context/quiz';

function Welcome() {

    const [quizState, dispatch] = useContext(QuizContext);


    return (
        <div id='welcome'> 
            <h2>Seja bem-vindo!</h2>
            <p>Clique no botão abaixo para começar:</p>

            <button onClick={() => dispatch({type: "CHANGE_STATE"})}>Iniciar</button>

            <img src={logoOP} alt="Início do Quiz" />
        </div>
    )
}

export default Welcome;