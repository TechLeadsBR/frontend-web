import React, { useState } from 'react'
import stylesCss from './cadastroAluno.module.css'
import Header from './../../components/header/header'
import SFooter from './../../components/simplefooter/simplefooter'
import Input from './../../components/input/input'
import Select from './../../components/select/select'
import TextArea from './../../components/textAreaInput/textAreaInput'
import RadioInput from './../../components/radioInput/radioInput'
import Button from './../../components/button/button'
import {
    UF,
    Positions,
    BehavioralProfiles,
    Levels,
    SpecifyDisability
} from '../../services/constants/data'
import { Colors } from './../../services/constants/constants'
import { formNewStudent, formNewAddress } from './../../services/constants/templates'

export default function CadastroAluno() {

    const [newStudent, setNewStudent] = useState(formNewStudent)
    const [newAddress, setNewAddress] = useState(formNewAddress)

    const [viacepRequestState, setViacepRequestState] = useState({
        logradouro: null,
        bairro: null,
        localidade: null
    })

    const setStateNewStudent = (key, value) => setNewStudent({ ...newStudent, [key]: value })
    const setStateNewAddress = (key, value) => setNewAddress({ ...newAddress, [key]: value })

    const formRegisterStudent = (
        <div className={stylesCss.formRegisterStudent}>
            <form>
                <Input
                    labelText={"Nome"}
                    name={"name"}
                    type={"text"}
                    onChange={event => setStateNewStudent("nome", event.target.value)}
                />
                <Input
                    labelText={"E-mail"}
                    name={"email"}
                    type={"email"}
                    onChange={event => setStateNewStudent("email", event.target.value)}
                />
                <Input
                    labelText={"Senha"}
                    name={"password"}
                    type={"password"}
                    onChange={event => setStateNewStudent("senha", event.target.value)}
                />
                <Input
                    labelText={"Confirmação de Senha"}
                    name={"checkPassword"}
                    type={"text"}
                    onChange={event => setStateNewStudent("senha", event.target.value)}
                />
                <Input
                    labelText={"Data de Nascimento"}
                    name={"dateBirt"}
                    type={"date"}
                    onChange={event => setStateNewStudent("dataNascimento", event.target.value)}
                />
                <Input
                    labelText={"Genêro"}
                    name={"gender"}
                    type={"text"}
                    onChange={event => setStateNewStudent("genero", event.target.value)}
                />
                <div style={{ width: "30%" }}>
                    <RadioInput
                        callbackChangedValue={value => setStateNewStudent("nomeSocial", value)}
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
                    onChange={event => setStateNewAddress("cep", event.target.value)}
                />
                <Select
                    labelText={"Estado"}
                    name={"uf"}
                    options={UF}
                    callbackChangedValue={(value) => setStateNewAddress("localidade", value)}
                />
                <Input
                    labelText={"Logradouro"}
                    name={"street"}
                    type={"text"}
                    onChange={event => setStateNewAddress("logradouro", event.target.value)}
                />
                <Input
                    labelText={"Bairro"}
                    name={"district"}
                    type={"text"}
                    onChange={event => setStateNewAddress("bairro", event.target.value)}
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
                    onChange={event => setStateNewStudent("complemento", event.target.value)}
                />
                <div style={{ width: "30%" }}>
                    <RadioInput
                        callbackChangedValue={value => console.log(value)}
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
                <TextArea
                    labelText={"Informe suas habilidades (mínimo 3)"}
                />
                <Input
                    labelText={"Idioma:"}
                    name={"language"}
                    type={"text"}
                    onChange={event => setStateNewStudent("idioma", event.target.value)}
                />
                <Select
                    labelText={"Nível:"}
                    name={"levels"}
                    options={Levels}
                    callbackChangedValue={(value) => setStateNewStudent("nivel", value)}
                />
                <div className={stylesCss.divButton}>
                    <Button
                        bgColor={Colors.red.hexadecimal}
                        text={"Concluir Cadastro"}
                        textColor={Colors.white.hexadecimal}
                        onClick={() => console.log(newStudent)}
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
        </div>
    )
}
