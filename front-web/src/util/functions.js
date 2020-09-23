// função para salvar no localStorage
export const saveInLocalStorage = (key, value) => localStorage.setItem(key, value)

// função para pegar um valor no localStorage
export const getInLocalStorage = (key) => localStorage.getItem(key)

export const decryptPayloadJwtAndReturnObject = (token) => {
    const payload = String(token).split('.')[1]
    const decryptedToken = atob(payload)
    return JSON.parse(decryptedToken)
}