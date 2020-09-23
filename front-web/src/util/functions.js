import { KEY_USER_JWT } from './constants'

// função para salvar no localStorage
export const saveInLocalStorage = (key, value) => localStorage.setItem(key, value)

// função para pegar um valor no localStorage
export const getInLocalStorage = (key) => localStorage.getItem(key)

export const decryptPayloadJwtAndReturnObject = (base64) => {
    const payload = String(base64).split('.')[1]
    const decryptedToken = atob(payload)
    return JSON.parse(decryptedToken)
}

export const verifyAuthenticatedUser = () => localStorage.getItem(KEY_USER_JWT) !== null
