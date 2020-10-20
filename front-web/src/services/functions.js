import { KEY_USER_JWT } from './constants'

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
    console.log(payload.Role)
    return payload.Role
}

export const breakToken = () => {
    removeInLocalStorage(KEY_USER_JWT)
}