import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const GET_POST_QUERY = gql`
query getPostDetailsByID($id : String!)  {
    getPostDetailsByID(id : $id) {
      ok
      error
      post {
        id
        posttype
        user {
          id
          username
        }
        body
        vote
        comments {
          id
          body
          user {
            id
            username
          }
        }
        title
        tags
        answers {
          id
          body
          vote
          comments {
          id
          body
          user {
            id
            username
          }
        }
        }
        createdAt
        updatedAt 
      }
    }
  }  
`;

export const usePostDetailsQuery = (variables) => useQuery(GET_POST_QUERY, { variables: variables });
