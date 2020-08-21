import { Alert } from 'rsuite'

export const unAuthorizedError = (error, history) => {
    Alert.warning(error)
    history.push('/login')
}

export const unknownError = (error) => {
    Alert.error(`Unknown Error: ${error}`)
}