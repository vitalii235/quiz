import React, { Component } from 'react';
import classes from './Quiz.module.css';
import ActiveQiuz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import { fetchQuizById, quizAnsweClick, retryQuiz } from '../../store/actions/quiz';

class Quiz extends Component {
    
    async componentDidMount() {
        this.props.fetchQuizById (this.props.match.params.id)
    }
    componentWillUnmount () {
        this.props.retryQuiz()
    }
    render() {
        console.log(this.props)
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>

                    {
                        this.props.loading || !this.props.quiz
                            ? <Loader />
                            : this.props.isFinished
                                ? <FinishedQuiz
                                    quiz={this.props.quiz}
                                    results={this.props.results}
                                    onRetry={this.props.retryQuiz}
                                />
                                : <ActiveQiuz
                                    // Передача вариантов ответов 
                                    answers={this.props.quiz[this.props.activeQuestion].answers}
                                    // Передача вопросов
                                    questions={this.props.quiz[this.props.activeQuestion].question}
                                    // Проверка ответа
                                    onAnswerClick={this.props.quizAnsweClick}
                                    // Передаем общую длинну (кол-во) вопросов
                                    quizLength={this.props.quiz.length}
                                    // Передаем номер текущего вопроса
                                    answerNumber={this.props.activeQuestion + 1}
                                    // Передача для стилей
                                    state={this.props.answerState} />
                    }


                </div>

            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
      results: state.quiz.results,
      isFinished: state.quiz.isFinished,
      activeQuestion: state.quiz.activeQuestion,
      answerState: state.quiz.answerState,
      quiz: state.quiz.quiz,
      loading: state.quiz.loading
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      fetchQuizById: id => dispatch(fetchQuizById(id)),
      quizAnsweClick: answerId => dispatch(quizAnsweClick(answerId)) ,
      retryQuiz: ()=> dispatch (retryQuiz()) 
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)