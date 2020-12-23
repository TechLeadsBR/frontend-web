import React, { useState } from 'react'
import stylesCss from './cadastroEmpresa.module.css'
import Header from './../../components/header/header'
import Input from './../../components/input/input'
import Button from './../../components/button/button'
import TextArea from './../../components/textAreaInput/textAreaInput'
import SimpleFooter from './../../components/simplefooter/simplefooter'
import ReactToast from './../../components/reactToast/reactToast'
import { formNewCompany } from './../../services/constants/templates'
import { messageToast } from './../../services/functions'
import { companyActions } from './../../actions'
import { useHistory } from 'react-router-dom'

export default function CadastroEmpresa() {

    const history = useHistory()
    const [newCompany, setNewCompany] = useState(formNewCompany)
    const [confirmPasswordState, setConfirmPassword] = useState("")

    const setStateNewCompany = (key, value) => setNewCompany({ ...newCompany, [key]: value })


    //#region Validations
    const confirmPasswordValidation = newCompany.senha !== null && newCompany.senha !== confirmPasswordState ? { border: "1px solid #BE0024" } : {}

    const validateInputsNewCompany = () => {
        const { razaoSocial, email, senha, cnpj, atividadeEconomica, telefone, telefoneDois, descricaoEmpresa } = newCompany
        if (!(razaoSocial && email && senha && cnpj && atividadeEconomica && telefone && telefoneDois && descricaoEmpresa)) {
            messageToast("Preencha os dados obrigatorios", "error")
            return false
        }
        else {
            if (cnpj.length > 14 || cnpj.length < 14) {
                messageToast("CNPJ Inválido", "error")
                return false
            }
            if (confirmPasswordState !== newCompany.senha) {
                messageToast("As senhas não são iguais!", "error")
                return false
            }
            else return true
        }
    }
    //#endregion

    const registerNewCompanyAPI = () => {
        if (!validateInputsNewCompany()) return

        companyActions.registerNewCompany(newCompany)
            .then(() => {
                messageToast("Empresa cadastrada com sucesso!", "success")
                history.push("/login/empresa")
            })
            .catch(() => messageToast("Ocorreu um erro, verifique os dados digitados", "error"))
    }

    const formRegisterCompany = (
        <div className={stylesCss.formRegisterCompany}>
            <form>
                <Input
                    labelText={"Razão Social:*"}
                    name={"companyname"}
                    type={"text"}
                    onChange={event => setStateNewCompany("razaoSocial", event.target.value)}
                />
                <Input
                    labelText={"E-mail:*"}
                    name={"email"}
                    type={"email"}
                    onChange={event => setStateNewCompany("email", event.target.value)}
                />
                <Input
                    labelText={"Senha:*"}
                    name={"password"}
                    type={"password"}
                    onChange={event => setStateNewCompany("senha", event.target.value)}
                />
                <Input
                    customStyles={confirmPasswordValidation}
                    labelText={"Confirmar Senha:*"}
                    name={"confirmPassword"}
                    type={"password"}
                    onChange={event => setConfirmPassword(event.target.value)}
                />
                <Input
                    labelText={"CNPJ*"}
                    name={"cnpj"}
                    type={"text"}
                    currentValue={newCompany.cnpj}
                />
                <Input
                    labelText={"Atividade econômica (Nr CNAE)*"}
                    name={"economyActivity"}
                    type={"text"}
                    onChange={event => setStateNewCompany("atividadeEconomica", event.target.value)}
                />
                <Input
                    labelText={"Telefone 1*"}
                    name={"telefone1"}
                    type={"text"}
                    onChange={event => setStateNewCompany("telefone", event.target.value)}
                />
                <Input
                    labelText={"Telefone 2*"}
                    name={"telefone2"}
                    type={"text"}
                    onChange={event => setStateNewCompany("telefoneDois", event.target.value)}
                />
                <TextArea
                    labelText={"Descrição Empresa*"}
                    callbackChangedValue={value => setStateNewCompany("descricaoEmpresa", value)}
                />
                <div className={stylesCss.divButton}>
                    <Button
                        text={"Concluir Cadastro"}
                        onClick={() => registerNewCompanyAPI()}
                    />
                </div>
            </form>
        </div>
    )

    return (
        <div className={stylesCss.root}>
            <Header />
            <h1>Cadastro</h1>
            {formRegisterCompany}
            <SimpleFooter />
            <ReactToast />
        </div>
    )
}
