import axios from '../../axios/axios-quiz'
import { FETCH_QUIZES_START,
        FINISH_QUIZ, 
        FETCH_QUIZES_SUCCESS, 
        FETCH_QUIZES_ERROR, 
        FETCH_QUIZ_SUCCESS, 
        QUIZ_SET_STATE, 
        QUIZ_NEXT_QUESTION,
        QUIZ_RETRY} from './actionTypes'

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get('/quizes.json')
            const quizes = []
            console.log(quizes)
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест №${index + 1}`
                })
            })
            dispatch(fetchQuizesSuccess(quizes))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes: quizes
    }
}

export function fetchQuizesError(e) {
    return {
        type: FETCH_QUIZES_ERROR,
        error: e
    }
}
export function fetchQuizById(quizId) {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get(`/quizes/${quizId}.json`)
            const quiz = response.data

            dispatch(fetchQuizSuccess(quiz))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}
export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState,
        results
    }

}

export function finishQuiz () {
    return {
        type:FINISH_QUIZ
    }
}

export function quizNextQuestion (number) {
    return {
        type:QUIZ_NEXT_QUESTION,
        number
    }
}

export function retryQuiz () {
    return {
        type:QUIZ_RETRY
    }
}

export function quizAnsweClick(answerId) {
    
    return (dispatch, getState) => {
        const state = getState().quiz
        // Для предотвращения проклацивания
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0]
            if (state.answerState[key] === 'success') {
                return
            }
        }
        // Выбираем вопрос
        const question = state.quiz[state.activeQuestion]
        const results = state.results
        // Если все правильно
        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) { results[question.id] = 'success' }
            // Стили фона
            dispatch(quizSetState({ [answerId]: 'success' }, results))

            // Переключение
            const timeout = window.setTimeout(() => {
                // Финиш (Если счетчика равен количеству вопросов я нечего не делаю)
                if (isQuizFinished(state)) {
                    dispatch(finishQuiz())
                    // Если нет то я переключаю вопросы
                } else {
                   
                    dispatch(quizNextQuestion(state.activeQuestion + 1))
                }

                window.clearTimeout(timeout)
            }, 1000)

        } else {
            results[question.id] = 'error'
            dispatch(quizSetState({ [answerId]: 'error' }, results))
        }

    }
}

function isQuizFinished (state) {
    return state.activeQuestion + 1 === state.quiz.length
}
