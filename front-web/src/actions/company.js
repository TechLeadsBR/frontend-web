import { requestAPI } from '../services/api'

export const registerNewCompany = async (newCompany) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!newCompany) throw new Error("Parametros obrigatorios não identificados")
            const request = await requestAPI("post", "/empresa", newCompany)
            if (request.status === 201) resolve(request)
        } catch (error) {
            reject(error)
        }
    })
}
