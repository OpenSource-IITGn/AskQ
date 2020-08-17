import React, { createContext, useState } from 'react';

export const CommentsContext = createContext();

export const CommentsProvider = props => {
    console.log(props)

    const [commentsList, setCommentsList] = useState(
        props.comments
    );
    console.log(commentsList)

    const updateCommentsList = (newComment) => {
        setCommentsList([...commentsList, newComment])
    }

    return (
        <CommentsContext.Provider value={{ commentsList, setCommentsList, updateCommentsList }}>
            {props.children}
        </CommentsContext.Provider>
    )
}