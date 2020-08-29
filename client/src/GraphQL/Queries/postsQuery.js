import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const POSTS_QUERY = gql`
query getPosts($limit:Int!, $offset:Int!, $username: String){
    getPosts(limit:$limit, offset:$offset, username: $username){
    ok
    error
    posts {
      id
      title
    }
  }
} 
`;

export const usePostsQuery = (variables) => useQuery(POSTS_QUERY, { variables: variables, fetchPolicy: "cache-and-network", onCompleted: (data) => console.log(data), onError: (error) => console.log(error) });
