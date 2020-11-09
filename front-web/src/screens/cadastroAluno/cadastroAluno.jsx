import React, { useState, useEffect } from 'react'
import stylesCss from './cadastroAluno.module.css'
import Header from './../../components/header/header'
import SimpleFooter from './../../components/simplefooter/simplefooter'
import Input from './../../components/input/input'
import Select from './../../components/select/select'
import TextArea from './../../components/textAreaInput/textAreaInput'
import RadioInput from './../../components/radioInput/radioInput'
import ReactToast from './../../components/reactToast/reactToast'
import Button from './../../components/button/button'
import {
    Positions,
    BehavioralProfiles,
    SpecifyDisability
} from '../../services/constants/data'
import { formNewStudent, formNewAddress } from './../../services/constants/templates'
import { requestAPI } from './../../services/api'
import { messageToast, getInSessionStorage, functionAfterTime } from './../../services/functions'
import { useHistory } from 'react-router-dom'

export default function CadastroAluno() {

    const history = useHistory()
    const [newStudent, setNewStudent] = useState(formNewStudent)
    const [newAddress, setNewAddress] = useState(formNewAddress)
    const [confirmPasswordState, setConfirmPassword] = useState("")
    const [isDeficient, setIsDeficient] = useState("nao")
    const [hasASocialName, setHasASocialName] = useState("nao")

    const setStateNewStudent = (key, value) => setNewStudent({ ...newStudent, [key]: value })
    const setStateNewAddress = (key, value) => setNewAddress({ ...newAddress, [key]: value })

    useEffect(() => {
        const requestViacepAPI = async () => {
            try {
                const request = await fetch(`https://viacep.com.br/ws/${newAddress.cep}/json/`)
                const response = await request.json()
                const { logradouro, bairro, localidade } = response
                setNewAddress(address => {
                    return {
                        ...address,
                        bairro,
                        localidade,
                        logradouro
                    }
                })
            } catch (error) {
                messageToast("Ocorreu um erro ao buscar os dados do endereço", "error")
            }
        }
        if (newAddress.cep.length === 8) requestViacepAPI()
    }, [newAddress.cep])

    //#region Validations
    const confirmPasswordValidation = newStudent.senha !== null && newStudent.senha !== confirmPasswordState ? { border: "1px solid #BE0024" } : {}

    const validationInputsNewStudent = () => {
        const { nome, email, senha, rg, cpf, dataNascimento, genero, cursoSenai, dataFormacao, telefone } = newStudent
        if (!(nome && email && senha && rg && cpf && dataNascimento && genero && cursoSenai && dataFormacao && telefone)) {
            console.log({
                nome, email, senha, rg, cpf, dataNascimento, genero, cursoSenai, dataFormacao, telefone
            })
            messageToast("Preencha os dados obrigatórios", "error")
            return false
        }
        else {
            if (cpf.length > 11 || cpf.length < 11) {
                messageToast("CPF Inválido", "error")
                return false
            }
            if (rg.length > 9 || rg.length < 9) {
                messageToast("RG Inválido", "error")
                return false
            }
            if (confirmPasswordState !== newStudent.senha) {
                messageToast("As senhas não são iguais!", "error")
                return false
            }
            else return true
        }
    }

    const validationInputNewAddress = () => {
        const { bairro, cep, numero, logradouro, localidade } = newAddress
        if (!(bairro && cep && numero && logradouro && localidade)) {
            messageToast("Preencha o endereço corretamente", "error")
            return false
        }
        else return true
    }
    //#endregion

    //#region Requests API
    const saveNewAddressAPI = async () => {
        if (!validationInputNewAddress()) return
        try {
            const request = await requestAPI("post", "/endereco", newAddress)

            if (request.status === 201) {
                const idAddress = request.data.message.split(" ")[5]
                setStateNewStudent("idEndereco", idAddress)
                await registerNewStudentAPI()
            }
        } catch (error) {
            messageToast("Ocorreu um erro, verifique os dados digitados", "error")
        }
    }

    const registerNewStudentAPI = async () => {
        if (!validationInputsNewStudent()) return
        try {
            const request = await requestAPI("post", "/aluno", newStudent)

            if (request.status === 201) {
                messageToast("Usuario cadastrado com sucesso!", "success")
                functionAfterTime(5000, () => history.push("/login/aluno"))                
            }

        } catch (error) {
            messageToast("Ocorreu um erro, verifique os dados digitados", "error")
        }
    }
    //#endregion

    const formRegisterStudent = (
        <div className={stylesCss.formRegisterStudent}>
            <form>
                <Input
                    labelText={"Nome*"}
                    name={"name"}
                    type={"text"}
                    onChange={event => setStateNewStudent("nome", event.target.value)}
                />
                <Input
                    labelText={"E-mail*"}
                    name={"email"}
                    type={"email"}
                    onChange={event => setStateNewStudent("email", event.target.value)}
                />
                <Input
                    labelText={"Senha*"}
                    name={"password"}
                    type={"password"}
                    onChange={event => setStateNewStudent("senha", event.target.value)}
                />
                <Input
                    customStyles={confirmPasswordValidation}
                    labelText={"Confirmação de Senha*"}
                    name={"checkPassword"}
                    type={"password"}
                    currentValue={confirmPasswordState}
                    onChange={event => setConfirmPassword(event.target.value)}
                />
                <Input
                    labelText={"Data de Nascimento*"}
                    name={"dateBirt"}
                    type={"date"}
                    onChange={event => setStateNewStudent("dataNascimento", event.target.value)}
                />
                <Select
                    labelText={"Gênero*"}
                    name={"gender"}
                    options={["Masculino", "Feminino", "Prefiro não dizer"]}
                    callbackChangedValue={value => setStateNewStudent("genero", value)}
                />
                <div className={stylesCss.divRadioInput}>
                    <RadioInput
                        callbackChangedValue={value => setHasASocialName(value)}
                        name={"nomeSocial"}
                        title={"Possui nome social?"}
                        valuesArray={[{
                            value: "sim",
                            name: "simRadioInput",
                            textLabel: "Sim"
                        }, {
                            value: "nao",
                            name: "naoRadioInput",
                            textLabel: "Não"
                        }]}
                    />
                </div>
                {hasASocialName === "sim" && (
                    <Input
                        labelText={"Nome social"}
                        name={"nomeSocialInput"}
                        onChange={event => setStateNewStudent("nomeSocial", event.target.value)}
                    />
                )}
                <Input
                    labelText={"CPF*"}
                    name={"cpfAluno"}
                    type={"text"}
                    currentValue={getInSessionStorage("CPF")}
                    onChange={() => setStateNewStudent("cpf", getInSessionStorage("CPF"))}
                />
                <Input
                    labelText={"RG*"}
                    name={"rgAluno"}
                    type={"text"}
                    onChange={event => setStateNewStudent("rg", event.target.value)}
                />
                <Input
                    labelText={"Telefone*"}
                    name={"telephone"}
                    type={"text"}
                    onChange={event => setStateNewStudent("telefone", event.target.value)}
                />
                <Input
                    labelText={"CEP*"}
                    name={"cep"}
                    type={"text"}
                    onChange={event => setStateNewAddress("cep", event.target.value.replace("-", ""))}
                />
                <Input
                    labelText={"Localidade*"}
                    name={"localidade"}
                    currentValue={newAddress.localidade}
                />
                <Input
                    labelText={"Logradouro*"}
                    name={"street"}
                    type={"text"}
                    currentValue={newAddress.logradouro}
                />
                <Input
                    labelText={"Bairro*"}
                    name={"district"}
                    type={"text"}
                    currentValue={newAddress.bairro}
                />
                <Input
                    labelText={"Número*"}
                    name={"number"}
                    type={"text"}
                    onChange={event => setStateNewAddress("numero", event.target.value)}
                />
                <Input
                    labelText={"Complemento"}
                    name={"complement"}
                    type={"text"}
                    onChange={event => setStateNewAddress("complemento", event.target.value)}
                />
                <div className={stylesCss.divRadioInput}>
                    <RadioInput
                        callbackChangedValue={value => setIsDeficient(value)}
                        name={"deficiencia"}
                        title={"Possui alguma deficiência?"}
                        valuesArray={[{
                            value: "sim",
                            name: "simRadioInput",
                            textLabel: "Sim"
                        }, {
                            value: "nao",
                            name: "naoRadioInput",
                            textLabel: "Não"
                        }]}
                    />
                </div>
                {isDeficient === "sim" && (
                    <>
                        <Select
                            labelText={"Especifique:"}
                            name={"specifyDisability"}
                            options={SpecifyDisability}
                            callbackChangedValue={(value) => setStateNewStudent("tipoDeficiencia", value)}
                        />
                        <TextArea
                            labelText={"Há algum detalhe sobre a deficiência que gostaria de adicionar?"}
                            callbackChangedValue={value => setStateNewStudent("detalheDeficiencia", value)}
                            name={"detalheDeficiencia"}
                        />
                    </>
                )}
                <h2>Sobre Você</h2>
                <Select
                    labelText={"Você é:"}
                    name={"positions"}
                    options={Positions}
                    callbackChangedValue={value => setStateNewStudent("preferenciaArea", value)}
                />
                <TextArea
                    labelText={"Resumo sobre você:"}
                    callbackChangedValue={value => setStateNewStudent("descricao", value)}
                />
                <Input
                    labelText={"Curso feito no SENAI:*"}
                    name={"course"}
                    type={"text"}
                    onChange={event => setStateNewStudent("cursoSenai", event.target.value)}
                />
                <Input
                    labelText={"Data da formação do curso feito:*"}
                    name={"dataFormacao"}
                    type={"date"}
                    onChange={event => setStateNewStudent("dataFormacao", event.target.value)}
                />
                <Input
                    labelText={"Linkedin:"}
                    name={"linkedin"}
                    type={"text"}
                    onChange={event => setStateNewStudent("linkedin", event.target.value)}
                />
                <Input
                    labelText={"GitHub:"}
                    name={"git"}
                    type={"text"}
                    onChange={event => setStateNewStudent("gitHub", event.target.value)}
                />
                <Select
                    labelText={"Perfil Comportamental:"}
                    name={"behavioralProfile"}
                    options={Object.keys(BehavioralProfiles).map(p => p)}
                    callbackChangedValue={(value) => setStateNewStudent("perfilComportamental", value)}
                />
                <div className={stylesCss.divButton}>
                    <Button
                        text={"Concluir Cadastro"}
                        onClick={() => saveNewAddressAPI()}
                    />
                </div>
            </form>
        </div>
    )

    return (
        <div className={stylesCss.root}>
            <Header />
            <h1>Cadastro</h1>
            {formRegisterStudent}
            <SimpleFooter />
            <ReactToast />
        </div>
    )
}
