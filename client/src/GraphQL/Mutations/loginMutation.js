import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useAuthToken } from "../../hooks/auth";


export const USER_SIGNIN = gql`
  mutation signIn($email: String!, $password: String!){
    signIn(email: $email, password: $password) {
        ok
        error
        token
    }
  }
`;

export const useLoginMutation = () => {
  const [_, setAuthToken, removeAuthtoken] = useAuthToken();

  const [mutation, mutationResults] = useMutation(USER_SIGNIN, {
    //if the mutation succeed, we save the token for later
    onCompleted: (data) => {
      setAuthToken(data.signIn.token)
    },
  });

  //we have rewritten the function to have a cleaner interface
  const login = async (email, password) => {

    await removeAuthtoken();

    return mutation({
      variables: {
        email: email,
        password: password
      }
    })

  }
  return [login, mutationResults]
};
