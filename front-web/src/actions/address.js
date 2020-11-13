import { requestAPI } from '../services/api'

export const registerNewAddress = async (newAddress) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!newAddress) throw new Error("Parametros obrigatorios não identificados")
            const request = await requestAPI("post", "/endereco", newAddress)
            if (request.status === 201) resolve(request)
        } catch (error) {
            reject(error)
        }
    })
}
