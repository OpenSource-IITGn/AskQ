import React, { useState, useContext } from 'react'
import { FlexboxGrid } from 'rsuite'
import Answer from './answer'
import AddAnswerForm from '../Forms/addAnswerForm'
import { AnswersContext } from './../../Contexts/AnswersContext'


function AnswerList(props) {

    const [answersList, setAnswersList] = useContext(AnswersContext)

    // initiate answers in state
    setAnswersList(props.answers)
    console.log(props.answers)
    console.log("initialized")

    const answerBlocks = answersList.map((a) => (<Answer answerDetails={a} />))

    const updateAnswerList = (newAnswer) => {
        setAnswersList(prevAnswersList => [...prevAnswersList, newAnswer])
    }

    return (
        <div>
            <AddAnswerForm {...props} updateAnswerList={updateAnswerList} />
            <FlexboxGrid align="bottom" style={{ padding: "3em" }}><h3>Answers</h3></FlexboxGrid>
            {answerBlocks}
        </div>
    )
}

export default AnswerList