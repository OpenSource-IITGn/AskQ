import React from 'react'
import { FlexboxGrid } from 'rsuite'
import Answer from './answer'
import AddAnswerForm from './addAnswerForm'

function AnswerList() {
    return (
        <div>
            <AddAnswerForm />
            <FlexboxGrid align="bottom" style={{ padding: "3em" }}><h3>Answers</h3></FlexboxGrid>
            <Answer />
            <Answer />
            <Answer />
            <Answer />
        </div>
    )
}

export default AnswerList