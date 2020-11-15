import { requestAPI } from './../services/api'

export const getMetrics = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await requestAPI("get", "/metrics")
            if (request.status === 200) resolve(request)
        } catch (error) {
            reject(error)
        }
    })
}
