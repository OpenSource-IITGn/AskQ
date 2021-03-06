import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

export const CREATE_COMMENT = gql`
  mutation createComment($pid: String!, $body: String!) {
    createComment(pid: $pid, body: $body) {
      ok
      error
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation updateComment($cid: String!, $body: String!) {
    updateComment(cid: $cid, body: $body) {
      ok
      error
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($cid: String!) {
    deleteComment(cid: $cid) {
      ok
      error
    }
  }
`;

export const useCreateCommentMutation = () => {
  const [mutation, mutationResults] = useMutation(CREATE_COMMENT, {
    //if the mutation succeed, we save the token for later
  });

  //we have rewritten the function to have a cleaner interface
  const createComment = async (pid, body) => {
    return mutation({
      variables: {
        pid: pid,
        body: body,
      },
    });
  };
  return [createComment, mutationResults];
};

export const useUpdateCommentMutation = () => {
  const [mutation, mutationResults] = useMutation(UPDATE_COMMENT, {
    //if the mutation succeed, we save the token for later
  });

  //we have rewritten the function to have a cleaner interface
  const updateComment = async (cid, body) => {
    return mutation({
      variables: {
        cid: cid,
        body: body,
      },
    });
  };
  return [updateComment, mutationResults];
};

export const useDeleteCommentMutation = () => {
  const [mutation, mutationResults] = useMutation(DELETE_COMMENT, {
    //if the mutation succeed, we save the token for later
  });

  //we have rewritten the function to have a cleaner interface
  const deleteComment = async (cid) => {
    return mutation({
      variables: {
        cid: cid,
      },
    });
  };
  return [deleteComment, mutationResults];
};
