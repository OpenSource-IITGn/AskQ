import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const USER_QUERY = gql`
query {
    getMyProfile {
      ok
      error
      user {
        id
        email
        username
      }
    }
  }  
`;

export const useUserQuery = () => useQuery(USER_QUERY);
