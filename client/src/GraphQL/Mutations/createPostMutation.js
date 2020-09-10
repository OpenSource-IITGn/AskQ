import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

export const CREATE_POST = gql`
  mutation createPost(
    $posttype: Int!
    $quesid: String
    $title: String
    $body: String!
    $tags: Tags!
  ) {
    createPost(
      posttype: $posttype
      quesid: $quesid
      title: $title
      body: $body
      tags: $tags
    ) {
      ok
      error
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost(
    $pid: String!
    $title: String
    $body: String
    $tags: Tags!
  ) {
    updatePost(pid: $pid, title: $title, body: $body, tags: $tags) {
      ok
      error
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($pid: String!) {
    deletePost(pid: $pid) {
      ok
      error
    }
  }
`;

export const useCreatePostMutation = () => {
  // const [_, setAuthToken, removeAuthtoken] = useAuthToken();
  const [mutation, mutationResults] = useMutation(CREATE_POST, {
    //if the mutation succeed, we save the token for later
  });

  //we have rewritten the function to have a cleaner interface
  const createPost = async (posttype, quesid, title, body, tags) => {
    let tagsList = null;
    if (tags) {
      const [tag1, tag2, tag3, tag4, tag5] = tags.split(",");
      tagsList = {
        tag1: tag1,
        tag2: tag2,
        tag3: tag3,
        tag4: tag4,
        tag5: tag5,
      };
    }
    return mutation({
      variables: {
        posttype: posttype,
        quesid: quesid,
        title: title,
        body: body,
        tags: tagsList,
      },
    });
  };
  return [createPost, mutationResults];
};

export const useUpdatePostMutation = () => {
  // const [_, setAuthToken, removeAuthtoken] = useAuthToken();
  const [mutation, mutationResults] = useMutation(UPDATE_POST, {
    //if the mutation succeed, we save the token for later
  });

  //we have rewritten the function to have a cleaner interface
  const updatePost = async (pid, title, body, tags) => {
    let tagsList = null;
    if (tags) {
      const [tag1, tag2, tag3, tag4, tag5] = tags.split(",");
      tagsList = {
        tag1: tag1,
        tag2: tag2,
        tag3: tag3,
        tag4: tag4,
        tag5: tag5,
      };
    }
    return mutation({
      variables: {
        pid: pid,
        title: title,
        body: body,
        tags: tagsList,
      },
    });
  };
  return [updatePost, mutationResults];
};

export const useDeletePostMutation = () => {
  // const [_, setAuthToken, removeAuthtoken] = useAuthToken();
  const [mutation, mutationResults] = useMutation(DELETE_POST, {
    //if the mutation succeed, we save the token for later
  });

  const deletePost = async (pid) => {
    return mutation({
      variables: {
        pid: pid,
      },
    });
  };
  return [deletePost, mutationResults];
};
