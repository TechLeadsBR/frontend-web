import React, { useState, useEffect } from 'react'
import stylesCss from './cadastroAluno.module.css'
import Header from './../../components/header/header'
import SFooter from './../../components/simplefooter/simplefooter'
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
import { Colors } from './../../services/constants/constants'
import { formNewStudent, formNewAddress } from './../../services/constants/templates'
import { requestAPI } from './../../services/api'

export default function CadastroAluno() {

    const [newStudent, setNewStudent] = useState(formNewStudent)
    const [newAddress, setNewAddress] = useState(formNewAddress)
    const [toastProps, setToastProps] = useState({ text: null, visible: false, status: null })
    const [confirmPasswordState, setConfirmPassword] = useState("")
    const [isDeficient, setIsDeficient] = useState("nao")
    const [hasASocialName, setHasASocialName] = useState("nao")

    const setStateNewStudent = (key, value) => setNewStudent({ ...newStudent, [key]: value })
    const setStateNewAddress = (key, value) => setNewAddress({ ...newAddress, [key]: value })

    useEffect(() => {
        const requestViacepAPI = async () => {
            console.log(newAddress.cep)
            try {
                const request = await fetch(`https://viacep.com.br/ws/${newAddress.cep}/json/`)
                const response = await request.json()
                console.log(response)
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
                console.log(error)
            }
        }
        if(newAddress.cep.length === 8) requestViacepAPI()
    }, [newAddress.cep])
    
    const toastAfterRequest = (text, status) => {
        setToastProps({ visible: true, text, status })
        setToastProps({ visible: false, text: null, status: null })
    }

    //#region Validations
    const confirmPasswordValidation = newStudent.senha !== null && newStudent.senha !== confirmPasswordState ? { border: "1px solid #BE0024" } : {}
    
    const validationInputsIsNotNull = () => {
        const { nome, email, senha, rg, cpf, dataNascimento, genero, cursoSenai, dataFormacao, telefone } = newStudent
        if (nome && email && senha && rg && cpf && dataNascimento && genero && cursoSenai && dataFormacao && telefone) {
            return true
        } else {
            return false
        }
    }
    //#endregion

    //#region Requests API
    const saveNewAddressAPI = async () => {
        try {
            const request = await requestAPI("post", "/endereco", newAddress)

            if (request.status === 201) {
                const idAddress = request.data.message.split(" ")[5]
                setStateNewStudent("idEndereco", idAddress)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const registerNewStudentAPI = async () => {
        // try {
        //     await saveNewAddressAPI()
        //     const request = await requestAPI("post", "/aluno", newStudent)

        //     if (request.status === 201) {
        //         toastAfterRequest("Usuario cadastrado com sucesso!", "success")
        //     }

        // } catch (error) {
        //     toastAfterRequest("Ocorreu um erro, verifique os dados digitados", "error")
        // }
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
                <Input
                    labelText={"Gênero*"}
                    name={"gender"}
                    type={"text"}
                    onChange={event => setStateNewStudent("genero", event.target.value)}
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
                    labelText={"CPF"}
                    name={"cpfAluno"}
                    type={"text"}
                    onChange={event => setStateNewStudent("cpf", event.target.value)}
                />
                <Input
                    labelText={"RG"}
                    name={"rgAluno"}
                    type={"text"}
                    onChange={event => setStateNewStudent("rg", event.target.value)}
                />
                <Input
                    labelText={"Telefone"}
                    name={"telephone"}
                    type={"text"}
                    onChange={event => setStateNewStudent("telefone", event.target.value)}
                />
                <Input
                    labelText={"CEP"}
                    name={"cep"}
                    type={"text"}
                    onChange={event => setStateNewAddress("cep", event.target.value.replace("-", ""))}
                />
                <Input
                    labelText={"Localidade"}
                    name={"localidade"}
                    currentValue={newAddress.localidade}
                />
                <Input
                    labelText={"Logradouro"}
                    name={"street"}
                    type={"text"}
                    currentValue={newAddress.logradouro}
                />
                <Input
                    labelText={"Bairro"}
                    name={"district"}
                    type={"text"}
                    currentValue={newAddress.bairro}
                />
                <Input
                    labelText={"Número"}
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
                {
                    isDeficient === "sim" && (
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
                    )
                }
                <h2>Sobre Você</h2>
                <Select
                    labelText={"Você é:"}
                    name={"positions"}
                    options={Positions}
                    callbackChangedValue={value => setStateNewStudent("preferenciaArea", value)}
                />
                <TextArea
                    labelText={"Resumo sobre você?"}
                    callbackChangedValue={value => setStateNewStudent("descricao", value)}
                />
                <Input
                    labelText={"Curso:"}
                    name={"course"}
                    type={"text"}
                    onChange={event => setStateNewStudent("cursoSenai", event.target.value)}
                />
                <Input
                    labelText={"Data da Formação:"}
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
                        bgColor={Colors.red.hexadecimal}
                        text={"Concluir Cadastro"}
                        textColor={Colors.white.hexadecimal}
                        onClick={() => registerNewStudentAPI()}
                    />
                </div>
            </form>
        </div>
    )

    return (
        <div className={stylesCss.root}>
            <Header
                typeHeader={"student"}
                srcImgUser={"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS1bO20QxvJm-byxSQFSbUKbpXXl_G_y1YqqQ&usqp=CAU"}
            />
            <h1>Cadastro</h1>
            {formRegisterStudent}
            <SFooter />
            <ReactToast 
                textToast={toastProps.text}
                visible={toastProps.visible}
                status={toastProps.status}
            />
        </div>
    )
}
