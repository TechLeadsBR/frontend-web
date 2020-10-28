import React, { useState } from 'react'
import stylesCss from './cadastroEmpresa.module.css'
import Header from './../../components/header/header'
import Input from './../../components/input/input'
import Button from './../../components/button/button'
import TextArea from './../../components/textAreaInput/textAreaInput'
import { Colors } from './../../services/constants/constants'

export default function CadastroEmpresa(){

    const [newCompany, setNewCompany] = useState({})

    const internSetStateForm = (key, value) => setNewCompany({...newCompany, [key]: value})

    const formRegisterCompany = (
        <div className={stylesCss.formRegisterCompany}>
            <form>
                <Input
                    labelText={"Confirmar Senha:"}
                    name={"confirmPassword"}
                    type={"text"}
                    onChange={event => internSetStateForm("senha", event.target.value)}
                />
                <div className={stylesCss.rowForm}>
                    <Input 
                        labelText={"CNPJ"}
                        name={"cnpj"}
                        type={"text"}
                    />
                    <Input 
                        labelText={"Atividade econômica (Nr CNAE)"}
                        name={"economyActivity"}
                        type={"text"}
                    />
                </div>
                <div className={stylesCss.rowForm}>
                    <Input 
                        labelText={"Telefone 1"}
                        name={"tel1"}
                        type={"number"}
                    />
                    <Input 
                        labelText={"Telefone 2"}
                        name={"tel2"}
                        type={"number"}
                    />
                </div>

                <TextArea 
                    labelText={"Descrição Empresa"}
                />

                <div className={stylesCss.divButton}>
                    <Button
                        bgColor={Colors.red.hexadecimal}
                        text={"Concluir Cadastro"}
                        textColor={Colors.white.hexadecimal}
                        onClick={() => console.log(newCompany)}
                    />
                </div>
            </form>
        </div>
    )

    return (
        <div className={stylesCss.root}>
            <Header 
                typeHeader={"company"}
                srcImgUser={"https://image.flaticon.com/icons/png/512/25/25634.png"}
            />
            <h1>Cadastro</h1>
            {formRegisterCompany}
        </div>
    )
}