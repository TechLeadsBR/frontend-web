import React, { useState } from 'react'
import stylesCss from './cadastroAluno.module.css'
import Header from './../../components/header/header'
import Footer from './../../components/footer/footer'
import Input from './../../components/input/input'
import Select from './../../components/select/select'
import {UF} from '../../services/constants/data'


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
                </div>
                  <Select
                        labelText={"Estado"}
                        name={"uf"}
                        options={UF}
                        callbackChangedValue={(value) => internSetStateForm("estado", value)}
                    />
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
            <Footer/>
        </div>
    )
}




