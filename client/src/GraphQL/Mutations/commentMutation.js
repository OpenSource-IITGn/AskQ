import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";


export const CREATE_COMMENT = gql`
  mutation createComment($pid: String!, $body: String!){
    createComment(pid: $pid, body: $body) {
        ok
        error
    }
  }
`;

export const UPDATE_COMMENT = gql`
mutation updateComment($cid: String!, $body: String!){
    updateComment(cid: $cid, body: $body) {
        ok
        error
    }
}
`

export const DELETE_COMMENT = gql`
mutation deleteComment($cid: String!){
    deleteComment(cid: $cid) {
        ok
        error
    }
}
`