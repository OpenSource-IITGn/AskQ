import React, { useEffect, useState, createContext } from 'react';
import { useUserQuery } from '../GraphQL/Queries/userQuery';
import { useAuthToken } from '../hooks/auth';
import { unknownError } from '../Components/errorHandler';

export const UserContext = createContext();

export const UserProvider = (props) => {
    const prevAuth = window.localStorage.getItem('authenticated') || false;
    const prevAuthBody = JSON.parse(window.localStorage.getItem('authBody')) || {
        id: '',
        username: '',
        email: ''
    };

    if (typeof (prevAuth) == String) {
        prevAuth = (prevAuth == 'true')
    }

    const [authenticated, setauthenticated] = useState(prevAuth);
    const [user, setUser] = useState(prevAuthBody);

    let [authToken] = useAuthToken();
    const userData = useUserQuery();

    useEffect(() => {
        fetchUser()
    }, [authenticated])

    const fetchUser = () => {
        if (userData.loading) return 'Loading...';
        if (userData.error) return `Error! ${userData.error.message}`;

        if (authToken === "null") {
            authToken = null
        }

        let isAuthenticated = false
        const response = userData.data.getMyProfile
        console.log(response)
        const isUser = (response.ok === 200)

        if (!user) {
            unknownError('Validate Credentials or Try again')
            return;
        }

        const userProfile = response.user
        console.log(userProfile)

        if (isUser && authToken) {
            isAuthenticated = true

            const authBody = {
                id: userProfile.id,
                username: userProfile.username,
                email: userProfile.email
            }

            setUser(authBody)
            window.localStorage.setItem('authenticated', authenticated.toString());
            window.localStorage.setItem('authBody', JSON.stringify(authBody));
        }

    }

    return (
        <UserContext.Provider value={{ authenticated, setauthenticated, user, setUser }}>
            {props.children}
        </UserContext.Provider>
    )
};