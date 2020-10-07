import { KEY_USER_JWT } from './constants'

// função para salvar no localStorage
export const saveInLocalStorage = (key, value) => localStorage.setItem(key, value)

// função para pegar um valor no localStorage
export const getInLocalStorage = (key) => localStorage.getItem(key)

export const decryptPayloadJwtAndReturnObject = (token) => {
    try {
        const payload = String(token.split('base64,')).split('.')[1]
        const decryptedToken = atob(payload)
        return JSON.parse(decryptedToken)
    } catch (error) {
        return false
    }
}

export const verifyAuthenticatedUser = () => localStorage.getItem(KEY_USER_JWT) !== null

export const removeInLocalStorage = (key) => localStorage.removeItem(key)