import axios from 'axios'
import { BASE_URL_API } from './constants'

async function requestApi(method, path, body=null, header=null){

    try {
        method = String(method).toLowerCase()
        if(method !== "get" && method !== "post" && method !== "put" && method !== "delete") throw new Error("Tipo de metodo invalido")
        
        return await axios[method](BASE_URL_API + path, body ? body : {})
    } catch(error){
        return error
    }
}

export { requestApi }