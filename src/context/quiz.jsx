import {createContext, useReducer} from 'react';
import questions from '../data/questions';

const STAGES = ["Start", "Playing", "End"];

// estagios do quiz
const initialState = {
    gameStage: STAGES[0],
    questions,
    currentQuestion: 0,
};

const quizReduce = (state, action) => {

    // bustituindo o estado anterior e mantendo as propiedades 
    switch(action.type) {
        case "CHANGE_STATE": 
            return {
                ...state,
                gameStage: STAGES[1],
            };

        // embaralhando as perguntas
        case "REORDER_QUESTIONS":
            const reorderedQuestions = questions.sort(() => {
                return Math.random() - 0.5;
            });
            return {
                ...state,
                questions: reorderedQuestions,
            };

        // mudando as perguntas do jogo e criando a logica para o game over
        case "CHANGE_QUESTION":
            const nextQuestion = state.currentQuestion + 1;
            let endGame = false;

            if(!questions[nextQuestion]) {
                endGame = true;
            }

            return {
                ...state,
                currentQuestion: nextQuestion,
                gameStage: endGame ? STAGES[2] : state.gameStage
            }

        // retornando ao estagio inicial
        case "NEW_GAME":
            return initialState;

        default: 
            return state;
    }
};

export const QuizContext = createContext();

export const QuizProvider = ({children}) => {
    const value = useReducer(quizReduce, initialState);

    return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}