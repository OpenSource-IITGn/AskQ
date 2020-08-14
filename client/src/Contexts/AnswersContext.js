import React, { createContext, useState } from 'react';

export const AnswersContext = createContext();

export const AnswersProvider = props => {

    const [answersList, setAnswersList] = useState(
        []
    );

    return (
        <AnswersContext.Provider value={[answersList, setAnswersList]}>
            {props.children}
        </AnswersContext.Provider>
    )
}