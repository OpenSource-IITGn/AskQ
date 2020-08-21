import { Alert } from 'rsuite'

export const unAuthorizedError = (error, history) => {
    Alert.warning(error)
    history.push('/login')
}

export const unknownError = (error) => {
    Alert.error(`Unknown Error: ${error}`)
}

export const invalidError = (error) => {
    Alert.error(`Invalide Data: ${error}`)
}

export const alreadySignedError = () => {
    Alert.info(`Already Signed up with this email Id.`)
}