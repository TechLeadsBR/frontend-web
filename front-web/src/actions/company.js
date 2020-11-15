import { requestAPI } from '../services/api'

export const getAllCompanys = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await requestAPI("get", "/empresa")
            if (request.status === 200) resolve(request)
        } catch (error) {
            reject(error)
        }
    })
}

export const registerNewCompany = (newCompany) => {
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

export const alterCompany = (idCompany, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!idCompany) throw new Error("Parametros obrigatorios não identificados")
            const request = await requestAPI("put", `/empresa/${idCompany}`, data)
            if (request.status === 200) resolve(request)
        } catch (error) {
            reject(error)
        }
    })
}

export const deleteCompany = (idCompany) => {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await requestAPI("delete", `/empresa/${idCompany}`)
            if (request.status === 200) resolve(request)
        } catch (error) {
            reject(error)
        }
    })
}

export const getInformationByCompanyId = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await requestAPI("get", "/empresa/id")
            if (request.status === 200) resolve(request)
        } catch (error) {
            reject(error)
        }
    })
}
