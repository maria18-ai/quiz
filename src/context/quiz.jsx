import {createContext, useReducer} from 'react';
import questions from '../data/questions_complete';

const STAGES = ["Start","Category","Playing","End"];

// estagios do quiz
const initialState = {
    gameStage: STAGES[0],
    questions,
    currentQuestion: 0,
    answerSelected: false,
    score: 0,
    help: false,
    optionToHide: null
};

const quizReduce = (state, action) => {

    // bustituindo o estado anterior e mantendo as propiedades 
    switch(action.type) {
        case "CHANGE_STATE": 
            return {
                ...state,
                gameStage: STAGES[1],
            };


        // escolhendo categorias 
        case "START_GAME" :
            let quizQuestions = null

            state.questions.forEach((question) => {
                if(question.category === action.payload) {
                    quizQuestions = question.questions
                }
            });

            return {
                ...state,
                questions: quizQuestions,
                gameStage: STAGES[2],
            }


        // embaralhando as perguntas
        case "REORDER_QUESTIONS":
            const reorderedQuestions = state.questions.sort(() => {
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

            if(!state.questions[nextQuestion]) {
                endGame = true;
            }

            return {
                ...state,
                currentQuestion: nextQuestion,
                gameStage: endGame ? STAGES[3] : state.gameStage,
                answerSelected: false,
                help: false,
            }


        // retornando ao estagio inicial
        case "NEW_GAME":
            return initialState;


        // checando a resposta selecionada pelo usuario 
        case "CHECK_ANSWER": {

            if (state.answerSelected) return state;

            const answer = action.payload.answer;
            const option = action.payload.option;
            let correctAnswer = 0;

            if (answer === option) correctAnswer = 1;

            return {
            ...state,
            score: state.score + correctAnswer,
            answerSelected: option,
            };
        }

        // mostrando dicas das perguntas 
        case "SHOW_TIP" :
            return {
                ...state,
                help: "tip"
            }

        // removendo opções 
        case "REMOVE_OPTION":
            const questionWithoutOption = state.questions[state.currentQuestion];

        let repeat = true;
        let optionToHide;

        questionWithoutOption.options.forEach((option) => {
            if(option !== questionWithoutOption.answer && repeat) {
                optionToHide = option;
                repeat = false;
            }
        });

        return {
            ...state,
            optionToHide,
            help: true,
        };


        default: 
            return state;
    }
};

export const QuizContext = createContext();

export const QuizProvider = ({children}) => {
    const value = useReducer(quizReduce, initialState);

    return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}