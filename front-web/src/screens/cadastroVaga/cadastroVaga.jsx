import React from 'react'
import stylesCss from './cadastroVaga.module.css'
import Header from './../../components/header/header'
import Footer from './../../components/footer/footer'
import Input from './../../components/input/input'
import Select from './../../components/select/select'
import TextAreaInput from './../../components/textAreaInput/textAreaInput'
import Button from './../../components/button/button'
import { Colors } from './../../services/constants'
import {
    Positions,
    Levels,
    UF,
    TypeContracts
} from './../../services/data'
import { useState } from 'react'

export default function CadastroVaga() {

    const formJobRegister = (
        <div className={stylesCss.formJobRegister}>
            <form>
                <Input
                    labelText={"Título"}
                    name={"titleJob"}
                    onChange={event => console.log(event.target.value)}
                />
                <div className={stylesCss.rowForm}>
                    <Select
                        name={"office"}
                        labelText={"Cargo"}
                        options={Positions}
                        callbackChangedValue={(value) => console.log(value)}
                    />
                    <Select
                        name={"level"}
                        labelText={"Nível"}
                        options={Levels}
                    />
                </div>
                <div className={stylesCss.rowForm}>
                    <Select
                        name={"city"}
                        labelText={"Cidade"}
                        options={UF}
                        callbackChangedValue={(value) => console.log(value)}
                    />
                    <Select
                        name={"typeContract"}
                        labelText={"Tipo de Contrato"}
                        options={TypeContracts}
                        callbackChangedValue={(value) => console.log(value)}
                    />
                </div>
                <div>
                    <TextAreaInput
                        name={"description"}
                        labelText={"Descrição"}
                    />
                    <TextAreaInput
                        name={"skills"}
                        labelText={"Habilidades"}
                    />
                    <TextAreaInput
                        name={"remunerationAndBenefits"}
                        labelText={"Remuneração e benefícios"}
                    />
                </div>
                <div className={stylesCss.divButton}>
                    <Button
                        bgColor={Colors.red.hexadecimal}
                        text={"Concluir cadastro"}
                        textColor={Colors.white.hexadecimal}
                    />
                </div>

            </form>
        </div>
    )

    return (
        <div className={stylesCss.root}>
            <Header
                typeHeader={"company"}
                srcImgUser={"https://www.flaticon.com/svg/static/icons/svg/64/64096.svg"}
            />
            <h2>Cadastro de Vaga</h2>
            {formJobRegister}
            <Footer />
        </div>
    )
}