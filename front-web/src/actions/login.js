import { requestAPI } from './../services/api'

export const loginUser = (typeUser, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (typeUser !== "aluno" &&
                typeUser !== "empresa" &&
                typeUser !== "administrador") throw new Error("Usuario invalido")

            const request = await requestAPI("post", `/login/${typeUser}`, data)
            if (request.status === 200) resolve(request)
        } catch (error) {
            reject(error)
        }
    })
}
