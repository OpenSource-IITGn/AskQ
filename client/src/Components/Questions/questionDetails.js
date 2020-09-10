import React from "react";
import { Panel } from "rsuite";

import Question from "./question";
import AnswerList from "./../Answers/answerList";
import CommentSection from "./../Comments/commentSection";
import { CommentsProvider } from "./../../Contexts/CommentsContext";
import { usePostDetailsQuery } from "../../GraphQL/Queries/postDetailsQuery";
import { AnswersProvider } from "../../Contexts/AnswersContext";

function QuestionDetails(props) {
  const { quesId } = props;
  const postData = usePostDetailsQuery({ id: quesId });

  if (postData.loading) {
    return <div>loading</div>;
  }
  if (postData.error) {
    return <div> Error : postData.error </div>;
  }

  const { ok, error, post } = postData.data.getPostDetailsByID;
  const {
    id,
    title,
    body,
    comments,
    answers,
    tags,
    createdAt,
    upadatedAt,
    user,
    vote,
  } = post;
  const timeSinceCreation = "13 mins"; // make dynamic
  const numAnswers = answers.length;

  return (
    <div>
      <AnswersProvider initialState={post.answers}>
        <Question
          {...props}
          id={id}
          showDetailed={true}
          title={title}
          body={body}
          timeSinceCreation={timeSinceCreation}
          tags={tags}
          vote={vote}
          numAnswers={numAnswers}
          userName={user.username}
          userId={user.id}
        />
        <Panel className="comments-body">
          <CommentsProvider comments={comments}>
            <CommentSection postId={id} />
          </CommentsProvider>
        </Panel>
        <AnswerList {...props} />
      </AnswersProvider>
    </div>
  );
}

export default QuestionDetails;
