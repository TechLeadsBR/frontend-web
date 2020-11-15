import { postImageAPI } from './../services/api'

export const saveImage = (formData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await postImageAPI("/upload", formData)
            if (request.status === 201) resolve(request)
        } catch (error) {
            reject(error)
        }
    })
}
