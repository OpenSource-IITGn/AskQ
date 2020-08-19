import React, { useEffect, useContext } from 'react'
import { Panel } from 'rsuite'

import Question from './question'
import AnswerList from './../Answers/answerList'
import CommentSection from './../Comments/commentSection'
import { AnswersContext } from './../../Contexts/AnswersContext'
import { CommentsProvider } from './../../Contexts/CommentsContext'

function QuestionDetails(props) {


    const { post } = props
    const { id, title, body, comments, answers, tags, createdAt, upadatedAt, user, vote } = post
    const timeSinceCreation = "13 mins" // make dynamic
    const numAnswers = answers.length

    return (
        <div>
            <Question id={id} showDetailed={true} title={title} body={body} timeSinceCreation={timeSinceCreation} tags={tags} vote={vote} numAnswers={numAnswers} userName={user.name} userId={user.id} />
            <Panel className="comments-body" >
                <CommentsProvider comments={comments}>
                    <CommentSection postId={id} />
                </CommentsProvider>
            </Panel>
            <AnswerList {...props} />

        </div>
    )
}

export default QuestionDetails
