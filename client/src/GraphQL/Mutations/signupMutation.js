import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useAuthToken } from "../../hooks/auth";
import Cookie from "js-cookie"
import Cookies from 'universal-cookie';
const cookies = new Cookies();


export const USER_SIGNUP = gql`
  mutation signUp($userName : String!, $email: String!, $password: String!){
    signUp(userName: $userName,email: $email, password: $password) {
        ok
        error
    }
  }
`;

export const useSignupMutation = () => {
    const [_, setAuthToken, removeAuthtoken] = useAuthToken();

    const [mutation, mutationResults] = useMutation(USER_SIGNUP, {
        //if the mutation succeed, we save the token for later
        onCompleted: (data) => {
            // setAuthToken(data.signIn.token)
        },
    });

    //we have rewritten the function to have a cleaner interface
    const signUp = async (userName, email, password) => {

        await removeAuthtoken();
        console.log("userName", userName)
        return mutation({
            variables: {
                userName: userName,
                email: email,
                password: password
            }
        })

    }
    return [signUp, mutationResults]
};
