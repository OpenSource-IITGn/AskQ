import React, { CreateContext } from 'react';

export const UserContext = CreateContext(null)

export const UserProvider = (props) => {

    // const user = ;

    return (
        <UserContext.Provider>
            {props.children}
        </UserContext.Provider>
    )
}