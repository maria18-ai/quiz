import { useContext } from 'react'
import { QuizContext } from '../context/quiz'

import Category from '../img/robin-categorias.png'

import './PickCategory.css'

const PickCategory = () => {

    const [quizState, dispatch] = useContext(QuizContext);

    function chooseCategoryAndReorderQuestions(category) {
    dispatch({ type: "START_GAME", payload: category });

    return (
        <div id='category'>
            <h2>Escolha uma categoria</h2>
            <p>As perguntas serão referentes ao nível escolhido:</p>  
                {quizState.questions.map((question) => (
                    <button onClick={() => chooseCategoryAndReorderQuestions(question.category)} 
                    key={question.category}>{question.category}</button>
                ))}

            <img src={Category} alt="Categorias" />
        </div>
    )
}

export default PickCategory
