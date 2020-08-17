import React, { createContext, useState } from 'react';

export const AnswersContext = createContext();

export const AnswersProvider = props => {

    const [answersList, setAnswersList] = useState(
        props.initialState
    );

    const updateAnswerList = (newAnswer) => {
        setAnswersList([...answersList, newAnswer])
    }

    return (
        <AnswersContext.Provider value={[answersList, setAnswersList, updateAnswerList]}>
            {props.children}
        </AnswersContext.Provider>
    )
}