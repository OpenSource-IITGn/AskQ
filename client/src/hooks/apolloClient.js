import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { useAuthToken } from "./auth";
import React from 'react';
import Cookie from "js-cookie"


const httpLink = new HttpLink({ uri: "http://localhost:8080/query" });


const authMiddleware = () =>
    new ApolloLink((operation, forward) => {
        // add the authorization to the headers
        const authToken = Cookie.get("authToken") ? Cookie.get("authToken") : null;

        if (authToken) {
            operation.setContext({
                headers: {
                    Authorization: authToken,
                },
            });
        }

        return forward(operation);
    });

const cache = new InMemoryCache({});

export const useAppApolloClient = () => {
    return new ApolloClient({
        link: authMiddleware().concat(httpLink),
        cache,
    });
};
