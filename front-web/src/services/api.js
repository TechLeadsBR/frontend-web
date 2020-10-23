import axios from 'axios'
import { BASE_URL_API, KEY_USER_JWT } from './constants/constants'
import { verifyAuthenticatedUser as authenticated, getInLocalStorage } from './functions'

async function requestAPI(method="get", path, body=null){

    try {
        method = String(method).toLowerCase()
        if(method !== "get" && method !== "post" && method !== "put" && method !== "delete") throw new Error("Tipo de metodo invalido")

        const pathURL = BASE_URL_API + path
        const data = JSON.stringify(body)
        const configRequest = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": authenticated() ? "Bearer " + getInLocalStorage(KEY_USER_JWT) : null
            }
        }

        return await axios[method](pathURL, data, configRequest)

    } catch(error){
        throw new Error(error)
    }
}

export { requestAPI }
