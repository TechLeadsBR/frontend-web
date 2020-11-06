import { getJtiUserInToken, getInSessionStorage } from './../functions'

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
	nome: null,
	email: null, 
	senha: null,
	nomeSocial: null,
	rg: null,
	cpf: getInSessionStorage("CPF"),
	dataNascimento: null,
	genero: null,
	cursoSenai: null,
	dataFormacao: null,
	telefone: null,
	tipoDeficiencia: null,
	detalheDeficiencia: null,
	preferenciaArea: null,
	descricao: null,
	linkedin: null,
	gitHub: null,
	perfilComportamental: null,
	idTipoUsuario: 2,
	idEndereco: null
}

export const formNewAddress = {
	cep: "",
	logradouro: "",
	bairro: "",
	numero: '',
	complemento: "",
	localidade: ""
}

export const formNewCompany = {
    razaoSocial: null,
	email: null,
	senha:null,
	cnpj: getInSessionStorage("CNPJ"), 
	atividadeEconomica: null,
	telefone: null,
	telefoneDois: null,
	nomeFoto: null,
	descricaoEmpresa: null,
    idTipoUsuario: 3
}

export const formNewAdministrator = {
	nome: "",
	email: "",
	senha: "",
	cpf: "",
	idTipoUsuario: 1
}
