import { requestAPI } from './../services/api'

export const filterJobs = (value) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!value) throw new Error("Parametros obrigatorios não identificados")
            const request = await requestAPI("get", `/vagaemprego/${value}`)
            if (request.status === 200) resolve(request)
        } catch (error) {
            reject(error)
        }
    })
}

export const registerNewJob = (newJob) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!newJob) throw new Error("Parametros obrigatorios não identificados")
            const request = await requestAPI("post", "/vagaemprego", newJob)
            if (request.status === 201) resolve(request)
        } catch (error) {
            reject(error)
        }
    })
}
