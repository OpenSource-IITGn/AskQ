import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useAuthToken } from "../../hooks/auth";


export const CREATE_POST = gql`
  mutation createPost($posttype: Int!, $quesid: String, $title: String, $body: String!, $tags: Tags!){
    createPost(posttype: Int!, quesid: String, title: String, body: String!, tags: Tags!) {
        ok
        error
    }
  }
`;

export const useCreatePostMutation = () => {
    // const [_, setAuthToken, removeAuthtoken] = useAuthToken();

    const [mutation, mutationResults] = useMutation(CREATE_POST, {
        //if the mutation succeed, we save the token for later
        onCompleted: (data) => {
            console.log(data)
        },
    });

    //we have rewritten the function to have a cleaner interface
    const createPost = async (posttype, quesid, title, body, tags) => {
        const [tag1, tag2, tag3, tag4, tag5] = tags.split(",")

        tags = {
            tag1: tag1,
            tag2: tag2,
            tag3: tag3,
            tag4: tag4,
            tag5: tag5,
        }
        return mutation({
            variables: {
                posttype: posttype,
                quesid: quesid,
                title: title,
                body: body,
                tags: tags
            }
        })

    }
    return [login, mutationResults]
};
