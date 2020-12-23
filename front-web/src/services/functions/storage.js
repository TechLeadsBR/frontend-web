import { KEY_USER_JWT } from './../constants/constants'

export const removeInLocalStorage = (key) => localStorage.removeItem(key)

export const saveInLocalStorage = (key, value) => localStorage.setItem(key, value)

export const getInLocalStorage = (key) => localStorage.getItem(key)

export const saveTokenInLocalStorage = (token) => localStorage.setItem(KEY_USER_JWT, token)

export const saveInSessionStorage = (key, value) => sessionStorage.setItem(key, value)

export const getInSessionStorage = (key) => sessionStorage.getItem(key)