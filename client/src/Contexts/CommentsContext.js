import React, { createContext, useState } from "react";

export const CommentsContext = createContext();

export const CommentsProvider = (props) => {
  const [commentsList, setCommentsList] = useState(props.comments);

  const updateCommentsList = (newComment) => {
    setCommentsList([...commentsList, newComment]);
  };

  const deleteCommentAndUpdateList = (id) => {
    const filteredComments = commentsList.filter(
      (comment) => comment.id !== id
    );
    setCommentsList([...filteredComments]);
  };

  return (
    <CommentsContext.Provider
      value={{
        commentsList,
        setCommentsList,
        updateCommentsList,
        deleteCommentAndUpdateList,
      }}
    >
      {props.children}
    </CommentsContext.Provider>
  );
};
