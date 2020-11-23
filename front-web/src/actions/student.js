import { requestAPI } from '../services/api'

export const getAllStudents = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await requestAPI("get", "/aluno")
            if (request.status === 200) resolve(request)
        } catch (error) {
            reject(error)
        }
    })
}

export const registerNewStudent = (newStudent) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!newStudent) throw new Error("Parametros obrigatorios não identificados")
            const request = await requestAPI("post", "/aluno", newStudent)
            if (request.status === 201) resolve(request)
        } catch (error) {
            reject(error)
        }
    })
}

export const alterStudent = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id || !data) throw new Error("Parametros obrigatorios não identificados")
            const request = await requestAPI("put", `/aluno/${id}`, data)
            if (request.status === 200) resolve(request)
        } catch (error) {
            reject(error)
        }
    })
}

export const deleteStudent = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) throw new Error("Parametros obrigatorios não identificados")
            const request = await requestAPI("delete", `/aluno/${id}`)
            if (request.status === 200) resolve(request)
        } catch (error) {
            reject(error)
        }
    })
}

export const getInformationByStudentId = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await requestAPI("get", "/aluno/id")

            if (request.status === 200) resolve(request)
        } catch (error) {
            reject(error)
        }
    })
}