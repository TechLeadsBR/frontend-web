import { requestAPI } from './../services/api'
import { formatedTodayInDate } from './../services/functions'

export const registerNewJobApplication = async (idAluno, idVagaEmprego) => {
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
            reject (error)
        }
    })
}
