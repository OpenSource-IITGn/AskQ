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

export const useCreateCommentMutation = () => {

    const [mutation, mutationResults] = useMutation(CREATE_COMMENT, {
        //if the mutation succeed, we save the token for later
        onCompleted: (data) => {
            console.log(data)
        },
    });

    //we have rewritten the function to have a cleaner interface
    const createComment = async (pid, body) => {
        return mutation({
            variables: {
                pid: pid,
                body: body
            }
        })

    }
    return [createComment, mutationResults]
};
