import React from 'react'
import { useUserQuery } from "./../GraphQL/Queries/userQuery";
import { useAuthToken } from "./../hooks/auth";
import { Route, Redirect } from 'react-router-dom'


export default function ProtectedRoute({ component: Component, ...props }) {

    let [authToken] = useAuthToken()

    const userData = useUserQuery();
    if (userData.loading) return 'Loading...';
    if (userData.error) return `Error! ${userData.error.message}`;

    if (authToken === "null") {
        authToken = null
    }

    let isAuthenticated = false
    const isUser = userData.data.getMyProfile.ok
    console.log(userData)
    const user = userData.data.getMyProfile.user

    if (isUser && authToken) {
        alert('Authenticated')
        isAuthenticated = true
    }

    return (
        <Route
            {...props}
            render={props => isAuthenticated ? (<Component user={user} {...props} />) : (<Redirect to="/login" />)}
        />
    );
}
