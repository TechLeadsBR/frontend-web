import { getJtiUserInToken } from './../functions'

export const formNewJob = {
    titulo: null,
    nivel: null,
    cidade: null,
    descricaoVaga: null,
    habilidade: null,
    remuneracaoBeneficio: null,
    tipoContrato: null,
    idEmpresa: getJtiUserInToken()
}

export const formNewStudent = {
    
}
