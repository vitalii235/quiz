import React from 'react';
import classes from './ActiveQuiz.module.css';
import AnswersList from './AnswersList/AnswersList/AnswersList';


const ActiveQiuz = props => (
    <div className={classes.ActiveQiuz}>
        <p className={classes.Question}>
            <span>
                <strong>{props.answerNumber}</strong>&nbsp;
                {props.questions}
            </span>
            <small>{props.answerNumber} из {props.quizLength}</small>
        </p>
        <AnswersList
        state={props.state}
            answers={props.answers}
            onAnswerClick={props.onAnswerClick} />
    </div>
)

export default ActiveQiuz