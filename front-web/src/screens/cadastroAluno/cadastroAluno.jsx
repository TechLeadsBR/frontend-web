import React, { useState } from 'react'
import stylesCss from './cadastroAluno.module.css'
import Header from './../../components/header/header'
import SFooter from './../../components/simplefooter/simplefooter'
import Input from './../../components/input/input'
import Select from './../../components/select/select'
import TextArea from './../../components/textAreaInput/textAreaInput'
import RadioInput from './../../components/radioInput/radioInput'
import Button from './../../components/button/button'
import { UF } from '../../services/constants/data'
import { Positions } from '../../services/constants/data'
import { BehavioralProfiles } from '../../services/constants/data'
import { Levels } from '../../services/constants/data'
import {SpecifyDisability} from  '../../services/constants/data'
import { Colors } from './../../services/constants/constants'

export default function CadastroAluno() {

    const [newStudent, setNewStudent] = useState({})

    const internSetStateForm = (key, value) => setNewStudent({ ...newStudent, [key]: value })

    const formRegisterStudent = (
        <div className={stylesCss.formRegisterStudent}>
            <form>
                <Input
                    labelText={"Nome"}
                    name={"name"}
                    type={"text"}
                    onChange={event => internSetStateForm("nome", event.target.value)}
                />
                <Input
                    labelText={"E-mail"}
                    name={"email"}
                    type={"text"}
                    onChange={event => internSetStateForm("email", event.target.value)}
                />
                <Input
                    labelText={"Senha"}
                    name={"password"}
                    type={"text"}
                    onChange={event => internSetStateForm("senha", event.target.value)}
                />
                <Input
                    labelText={"Confirmação de Senha"}
                    name={"checkPassword"}
                    type={"text"}
                    onChange={event => internSetStateForm("senha", event.target.value)}
                />
                <Input
                    labelText={"Data de Nascimento"}
                    name={"dateBirt"}
                    type={"date"}
                    onChange={event => internSetStateForm("dataNascimento", event.target.value)}
                />

                <Input
                    labelText={"Genêro"}
                    name={"gender"}
                    type={"text"}
                    onChange={event => internSetStateForm("genero", event.target.value)}
                />
                <div style={{ width: "30%" }}>
                    <RadioInput
                        callbackChangedValue={value => console.log(value)}
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
                    labelText={"Telefone"}
                    name={"telephone"}
                    type={"text"}
                    onChange={event => internSetStateForm("telefone", event.target.value)}
                />
                <Input
                    labelText={"CEP"}
                    name={"cep"}
                    type={"text"}
                    onChange={event => internSetStateForm("cep", event.target.value)}
                />

                <Input
                    labelText={"Cidade"}
                    name={"city"}
                    type={"text"}
                    onChange={event => internSetStateForm("cidade", event.target.value)}
                /> 
                <Select
                    labelText={"Estado"}
                    name={"uf"}
                    options={UF}
                    callbackChangedValue={(value) => internSetStateForm("estado", value)}
                />

                <Input
                    labelText={"Logradouro"}
                    name={"street"}
                    type={"text"}
                    onChange={event => internSetStateForm("logradouro", event.target.value)}
                /> 
                    <Input
                        labelText={"Bairro"}
                        name={"district"}
                        type={"text"}
                        onChange={event => internSetStateForm("bairro", event.target.value)}
                    /> 
                <Input
                    labelText={"Número"}
                    name={"number"}
                    type={"text"}
                    onChange={event => internSetStateForm("numero", event.target.value)}
                /> 
                <Input
                    labelText={"Complemento"}
                    name={"complement"}
                    type={"text"}
                    onChange={event => internSetStateForm("complemento", event.target.value)}
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
                    callbackChangedValue={(value) => internSetStateForm("especifiquedeficiencia", value)}
                />

                <TextArea
                    labelText={"Há algum detalhe sobre a deficiência que gostaria de adicionar?"}
                />
                <h2>Sobre Você</h2>
                <Select
                    labelText={"Você é:"}
                    name={"positions"}
                    options={Positions}
                    callbackChangedValue={(value) => internSetStateForm("posisao", value)}
                />
                <TextArea
                    labelText={"Resumo sobre você?"}
                />

                <Input
                    labelText={"Curso:"}
                    name={"course"}
                    type={"text"}
                    onChange={event => internSetStateForm("cursoSenai", event.target.value)}
                />

                <Input
                    labelText={"Linkedin:"}
                    name={"linkedin"}
                    type={"text"}
                    onChange={event => internSetStateForm("linkedin", event.target.value)}
                />
                <Input
                    labelText={"GitHub:"}
                    name={"git"}
                    type={"text"}
                    onChange={event => internSetStateForm("github", event.target.value)}
                />
                <Select
                    labelText={"Perfil Comportamental:"}
                    name={"behavioralProfile"}
                    options={Object.keys(BehavioralProfiles).map(p => p)}
                    callbackChangedValue={(value) => internSetStateForm("perfilComportamental", value)}
                />
               
                <TextArea
                    labelText={"Informe suas habilidades (mínimo 3)"}
                />
                <Input
                    labelText={"Idioma:"}
                    name={"language"}
                    type={"text"}
                    onChange={event => internSetStateForm("idioma", event.target.value)}
                />
                <Select
                    labelText={"Nível:"}
                    name={"levels"}
                    options={Levels}
                    callbackChangedValue={(value) => internSetStateForm("nivel", value)}
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
            <SFooter/>
        </div>
    )
}




