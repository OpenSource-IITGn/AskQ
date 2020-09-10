import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const QUESTIONS_QUERY = gql`
  query getQuestions(
    $limit: Int!
    $offset: Int!
    $username: String
    $squery: String
  ) {
    getQuestions(
      limit: $limit
      offset: $offset
      username: $username
      squery: $squery
    ) {
      ok
      error
      posts {
        id
        title
        body
      }
    }
  }
`;

export const useQuestionsQuery = (variables) =>
  useQuery(QUESTIONS_QUERY, {
    variables: variables,
    fetchPolicy: "cache-and-network",
  });
