import React, { useState } from 'react'
import stylesCss from './cadastroAluno.module.css'
import Header from './../../components/header/header'
import Footer from './../../components/footer/footer'
import Input from './../../components/input/input'
import Select from './../../components/select/select'
import TextArea from './../../components/textAreaInput/textAreaInput'
import {UF} from '../../services/constants/data'
import {Positions} from '../../services/constants/data'
import {Profile} from '../../services/constants/data'
import {Levels} from '../../services/constants/data'
import Button from './../../components/button/button'
import { Colors } from './../../services/constants/constants'

export default function CadastroAluno(){

    const [newStudent, setNewStudent] = useState({})

    const internSetStateForm = (key, value) => setNewStudent({...newStudent, [key]: value})
    
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

                <div className={stylesCss.rowForm}>
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
                </div>

                <div className={stylesCss.rowForm}>
                   <Input
                   labelText={"Data de Nascimento"}
                   name={"dateBirt"}
                   type={"date"}
                   onChange={event => internSetStateForm("datanascimento", event.target.value)}
                   />

                   <Input
                   labelText={"Genêro"}
                   name={"gender"}
                   type={"text"}
                   onChange={event => internSetStateForm("genero", event.target.value)}
                   />
                </div>

                <div className={stylesCss.rowForm}>
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
                </div>

        
                <div className={stylesCss.rowForm}>     
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
                </div>
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

                <div className={stylesCss.rowForm}>
                    <Input
                    labelText={"Linkedin"}
                    name={"linkedin"}
                    type={"text"}
                    onChange={event => internSetStateForm("linkedin", event.target.value)}
                    />

                    <Input
                    labelText={"GitHub"}
                    name={"git"}
                    type={"text"}
                    onChange={event => internSetStateForm("github", event.target.value)}
                    />
                </div>

                <Select
                    labelText={"Perfil Comportamental:"}
                    name={"behavioralProfile"}
                    options={Profile}
                    callbackChangedValue={(value) => internSetStateForm("perfilComportamental", value)}
                />

                <TextArea
                    labelText={"Informe suas habilidades (mínimo 3)"}
                />

                    <h2>Idioma</h2>
    
                <div className={stylesCss.rowForm}>
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
                </div>
            </form>

            <Button
                bgColor={Colors.red.hexadecimal}
                text={"Concluir Cadastro"}
                textColor={Colors.white.hexadecimal}
                onClick={() => console.log(newStudent)}
            />
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
            <Footer/>
        </div>
    )
}




