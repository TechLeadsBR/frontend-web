import axios from 'axios'
import { BASE_URL_API } from './constants'
import { verifyAuthenticatedUser as authenticated, getInLocalStorage } from './functions'
import { KEY_USER_JWT } from './constants'

async function requestAPI(method="get", path, body=null){

    try {
        method = String(method).toLowerCase()
        if(method !== "get" && method !== "post" && method !== "put" && method !== "delete") throw new Error("Tipo de metodo invalido")

        const pathURL = BASE_URL_API + path
        const configRequest = {
            data: body,
            headers: {
                "Authorization": authenticated() ? "Bearer" + getInLocalStorage(KEY_USER_JWT) : null
            }
        }

        return await axios[method](pathURL, configRequest)

    } catch(error){
        return error
    }
}

export { requestAPI }