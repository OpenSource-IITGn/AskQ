import React from 'react'

export const useAuthorized = () => {

    const useIsAuthorized = (userId, postUserId) => {
        if (userId === postUserId) {
            return true
        }
        return false
    }

    return [useIsAuthorized]
}