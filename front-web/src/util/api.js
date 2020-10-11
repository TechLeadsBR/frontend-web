import axios from 'axios'
import { BASE_URL_API } from './constants'

async function requestApi(method="get", path, body=null, headers=null){

    try {
        method = String(method).toLowerCase()
        if(method !== "get" && method !== "post" && method !== "put" && method !== "delete") throw new Error("Tipo de metodo invalido")

        return await axios.get(BASE_URL_API + path, {
            data: body,
            headers
        })
    } catch(error){
        return error
    }
}

export { requestApi }