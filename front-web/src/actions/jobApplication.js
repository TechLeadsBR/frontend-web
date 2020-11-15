import { requestAPI } from './../services/api'
import { formatedTodayInDate } from './../services/functions'

export const registerNewJobApplication = (idAluno, idVagaEmprego) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!idAluno || !idVagaEmprego) throw new Error("Parametros obrigatorios não identificados")
            const bodyRequest = {
                dataInscricao: formatedTodayInDate(),
                idAluno, idVagaEmprego
            }
            const request = await requestAPI("post", "/inscricaoemprego", bodyRequest)
            if (request.status === 201) resolve(request)
        } catch (error) {
            reject(error)
        }
    })
}

export const getJobApplications = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await requestAPI("get", "/inscricaoemprego")
            if (request.status === 200) resolve(request)
        } catch (error) {
            reject(error)
        }
    })
}

export const deleteJobApplication = (idJobApplication) => {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await requestAPI("delete", `/inscricaoemprego/${idJobApplication}`)
            if (request.status === 200) resolve(request)
        } catch (error) {
            reject(error)
        }
    })
}