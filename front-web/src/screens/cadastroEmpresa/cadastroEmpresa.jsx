import React, { useState } from 'react'
import stylesCss from './cadastroEmpresa.module.css'
import Header from './../../components/header/header'
import Input from './../../components/input/input'
import Button from './../../components/button/button'
import TextArea from './../../components/textAreaInput/textAreaInput'
import Select from './../../components/select/select'
import SFooter from './../../components/simplefooter/simplefooter'
import { UF } from '../../services/constants/data'
import { Colors } from './../../services/constants/constants'

export default function CadastroEmpresa(){

    const [newCompany, setNewCompany] = useState({})

    const internSetStateForm = (key, value) => setNewCompany({...newCompany, [key]: value})

    const formRegisterCompany = (
        <div className={stylesCss.formRegisterCompany}>
            <form>
                    <Input
                        labelText={"Razão Social:"}
                        name={"companyname"}
                        type={"text"}
                        onChange={event => internSetStateForm("razaoSocial", event.target.value)}
                    />
                    
                    <Input
                        labelText={"E-mail:"}
                        name={"email"}
                        type={"text"}
                        onChange={event => internSetStateForm("email", event.target.value)}
                    />

                    <Input
                        labelText={"Senha:"}
                        name={"password"}
                        type={"text"}
                        onChange={event => internSetStateForm("senha", event.target.value)}
                    />
                    <Input
                        labelText={"Confirmar Senha:"}
                        name={"confirmPassword"}
                        type={"text"}
                        onChange={event => internSetStateForm("senha", event.target.value)}
                    />
                
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
          

                    <TextArea 
                        labelText={"Descrição Empresa"}
                     />

                    <Input
                        labelText={"CEP:"}
                        name={"password"}
                        type={"text"}
                        onChange={event => internSetStateForm("senha", event.target.value)}
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

                    <Input
                        labelText={"Nome Responsável:"}
                        name={"responsiblename"}
                        type={"text"}
                        onChange={event => internSetStateForm("nomeResponsavel", event.target.value)}
                    />  

                    <Input
                        labelText={"E-mail Responsável:"}
                        name={"responsibleemail"}
                        type={"text"}
                        onChange={event => internSetStateForm("emailResponsavel", event.target.value)}
                    />  

                    <Input
                        labelText={"Site:"}
                        name={"site"}
                        type={"text"}
                        onChange={event => internSetStateForm("site", event.target.value)}
                    />  

                    <Input
                        labelText={"Linkedin:"}
                        name={"linkedin"}
                        type={"text"}
                        onChange={event => internSetStateForm("linkedin", event.target.value)}
                    />  

                    <Input
                        labelText={"Facebook:"}
                        name={"facebook"}
                        type={"text"}
                        onChange={event => internSetStateForm("facebook", event.target.value)}
                    />  

                    <Input
                        labelText={"Instagram:"}
                        name={"instagram"}
                        type={"text"}
                        onChange={event => internSetStateForm("instagram", event.target.value)}
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
            <SFooter/>
        </div>
    )
}