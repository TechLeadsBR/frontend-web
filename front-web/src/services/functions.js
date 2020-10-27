import { KEY_USER_JWT } from './constants/constants'

// função para salvar no localStorage
export const saveInLocalStorage = (key, value) => localStorage.setItem(key, value)

// função para pegar um valor no localStorage
export const getInLocalStorage = (key) => localStorage.getItem(key)

export const verifyAuthenticatedUser = () => getInLocalStorage(KEY_USER_JWT) !== null

export const removeInLocalStorage = (key) => localStorage.removeItem(key)

export const decryptPayloadJwtAndReturnObject = (token) => {
    try {
        const payload = String(token.split('base64,')).split('.')[1]
        const decryptedToken = atob(payload)
        return JSON.parse(decryptedToken)
    } catch (error) {
        return false
    }
}

export const getRoleInToken = () => {
    const token = getInLocalStorage(KEY_USER_JWT)
    const payload = decryptPayloadJwtAndReturnObject(token)
    return payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
}

export const breakToken = () => {
    removeInLocalStorage(KEY_USER_JWT)
}

export const getJtiUserInToken = () => {
    const token = getInLocalStorage(KEY_USER_JWT)
    const payload = decryptPayloadJwtAndReturnObject(token)
    return payload["jti"]
}

export const formatData = (dateTime) => {
    const date = dateTime.split('T')[0]
    const splitted = date.split('-')
    return `${splitted[2]}/${splitted[1]}/${splitted[0]}`
}