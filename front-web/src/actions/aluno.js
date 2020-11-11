import { requestAPI } from '../services/api'

export const getAllStudents = async (success, errorCallback) => {
    try {
        const request = await requestAPI("get", "/aluno")
        if (request.status === 200) success(request.data)
    } catch (error) {
        errorCallback(error)
    }
}

export const putStudent = async (id, data, success, errorCallback) => {
    try {
        const request = await requestAPI("put", `/aluno/${id}`, data)
        if (request.status === 200) success(request.data)
    } catch (error) {
        errorCallback(error)
    }
}

export const deleteStudent = async (id, success, errorCallback) => {
    try {
        const request = await requestAPI("delete", `/aluno/${id}`)
        if (request.status === 200) success(request.data)
    } catch (error) {
        errorCallback(error)
    }
}
