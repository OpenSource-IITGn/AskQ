import React from 'react'
import Question from './question'
import AnswerList from './answerList'
import CommentSection from './commentSection'
import { usePostDetailsQuery } from '../GraphQL/Queries/postDetailsQuery'
import { Panel } from 'rsuite'
function QuestionDetails(props) {
    const quesId = props.match.params.id

    const postData = usePostDetailsQuery({ id: quesId })
    console.log(postData)

    if (postData.loading) {
        return (
            <div>loading</div>
        )
    }
    if (postData.error) {
        return (
            <div> Error : postData.error </div>
        )
    }

    const { ok, error, post } = postData.data.getPostDetailsByID
    const { title, body, comments, answers, tags, createdAt, upadatedAt, user, vote } = post
    const timeSinceCreation = "13 mins" // make dynamic
    const numAnswers = answers.length
    // console.log(answers)

    // const stringToHTML = (body) => {
    //     var htmlObject = document.createElement('div');
    //     htmlObject.innerHTML = body;
    //     return htmlObject
    // }

    return (
        <div>
            <Question showDetailed={true} title={title} body={body} timeSinceCreation={timeSinceCreation} tags={tags} vote={vote} numAnswers={numAnswers} userName={user.name} userId={user.id} />
            <Panel className="comments-body" >
                <CommentSection />
            </Panel>
            <AnswerList />

        </div>
    )
}

export default QuestionDetails
