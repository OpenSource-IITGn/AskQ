import React from "react";
import { useQuestionsQuery } from "../../GraphQL/Queries/questionsQuery";
import Question from "./question";
import { LIMITS_PER_PAGE } from "../../constants";
import SearchBar from "../searchBar/searchBar";

function QuestionList(props) {
  const { page_number } = props;
  const limit = LIMITS_PER_PAGE;
  const offset = page_number ? (page_number - 1) * limit : 0;
  const questionsData = useQuestionsQuery({ limit: limit, offset: offset });

  if (questionsData.loading) {
    return <div>loading</div>;
  }
  if (questionsData.error) {
    return <div> Error : questionData.error </div>;
  }

  const { data, fetchMore } = questionsData;
  const { ok, error, posts } = data.getQuestions;

  const allQuestions = posts
    ? posts.map((question) => (
        <Question showDetailed={false} {...question} {...props} />
      ))
    : "No Questions Found";

  return (
    <div>
      <SearchBar />
      {allQuestions}
    </div>
  );
}

export default QuestionList;
