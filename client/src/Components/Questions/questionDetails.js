import React from 'react'
import { Panel } from 'rsuite'

import Question from './question'
import AnswerList from './../Answers/answerList'
import CommentSection from './../Comments/commentSection'

function QuestionDetails(props) {


    const { post } = props
    const { title, body, comments, answers, tags, createdAt, upadatedAt, user, vote } = post
    const timeSinceCreation = "13 mins" // make dynamic
    const numAnswers = answers.length

    return (
        <div>
            <Question showDetailed={true} title={title} body={body} timeSinceCreation={timeSinceCreation} tags={tags} vote={vote} numAnswers={numAnswers} userName={user.name} userId={user.id} />
            <Panel className="comments-body" >
                <CommentSection />
            </Panel>
            <AnswerList {...props} answers={answers} />

        </div>
    )
}

export default QuestionDetails
