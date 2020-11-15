import { requestAPI } from './../services/api'

export const registerNewAdministrator = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data) throw new Error("Parametros obrigatorios não identificados")
            const request = await requestAPI("post", "/administrador", data)
            if (request.status === 201) resolve(request)
        } catch (error) {
            reject(error)
        }
    })
}

export const getAllAdministrators = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await requestAPI("get", "/administrador")
            if (request.status === 200) resolve(request)
        } catch (error) {
            reject(error)
        }
    })
}

export const deleteAdministrator = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) throw new Error("Parametros obrigatorios não identificados")
            const request = await requestAPI("delete", `/administrador/${id}`)
            if (request.status === 200) resolve(request)
        } catch (error) {
            reject(error)
        }
    })
}
