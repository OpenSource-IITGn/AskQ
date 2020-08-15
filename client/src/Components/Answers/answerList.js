import React, { useState, useContext, useEffect } from 'react'
import { FlexboxGrid } from 'rsuite'
import Answer from './answer'
import AddAnswerForm from '../Forms/addAnswerForm'
import { AnswersContext } from './../../Contexts/AnswersContext'


function AnswerList(props) {

    const [answersList, setAnswersList, updateAnswerList] = useContext(AnswersContext)
    const answerBlocks = answersList.map((a) => (<Answer answerDetails={a} />))

    const handleAnswerSubmit = (newAnswer) => {
        updateAnswerList(newAnswer)
    }

    return (
        <div>
            <AddAnswerForm {...props} onAnswerSubmit={handleAnswerSubmit} />
            <FlexboxGrid align="bottom" style={{ padding: "3em" }}><h3>Answers</h3></FlexboxGrid>
            {answerBlocks}
        </div>
    )
}

export default AnswerList