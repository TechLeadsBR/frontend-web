import React, { useState } from 'react'
import stylesCss from './cadastroVaga.module.css'
import Header from './../../components/header/header'
import Footer from './../../components/footer/footer'
import Input from './../../components/input/input'
import Select from './../../components/select/select'
import TextAreaInput from './../../components/textAreaInput/textAreaInput'
import ReactToast from './../../components/reactToast/reactToast'
import Button from './../../components/button/button'
import { useHistory } from 'react-router-dom'
import { Colors } from '../../services/constants/constants'
import { formNewJob } from './../../services/constants/templates'
import { requestAPI } from './../../services/api'
import {
    Levels,
    UF,
    TypeContracts
} from '../../services/constants/data'
import { functionAfterTime } from './../../services/functions'
import { toast } from 'react-toastify'

export default function CadastroVaga() {

    const history = useHistory()
    const [newJob, setNewJob] = useState(formNewJob)

    const internSetStateForm = (key, value) => setNewJob({ ...newJob, [key]: value })

    const requestApiNewJob = async () => {
        try {
            const request = await requestAPI("post", "/vagaemprego", newJob)

            if (request.status === 201) {
                toast("Vaga cadastrada com sucesso!")
                functionAfterTime(5000, () => history.push("/gerenciar-vagas"))
            }

        } catch (error) {
            toast("Ocorreu um erro ao cadastrar a vaga!", "error")
        }
    }

    const formJobRegister = (
        <div className={stylesCss.formJobRegister}>
            <form>
                <Input
                    labelText={"Título"}
                    name={"titleJob"}
                    onChange={event => internSetStateForm("titulo", event.target.value)}
                />
                <Select
                    name={"level"}
                    labelText={"Nível"}
                    options={Levels}
                    callbackChangedValue={(value) => internSetStateForm("nivel", value)}
                />
                <div className={stylesCss.rowForm}>
                    <Select
                        name={"city"}
                        labelText={"Cidade"}
                        options={UF}
                        callbackChangedValue={(value) => internSetStateForm("cidade", value)}
                    />
                    <Select
                        name={"typeContract"}
                        labelText={"Tipo de Contrato"}
                        options={TypeContracts}
                        callbackChangedValue={(value) => internSetStateForm("tipoContrato", value)}
                    />
                </div>
                <div>
                    <TextAreaInput
                        name={"description"}
                        labelText={"Descrição"}
                        callbackChangedValue={(value) => internSetStateForm("descricaoVaga", value)}
                    />
                    <TextAreaInput
                        name={"skills"}
                        labelText={"Habilidades"}
                        callbackChangedValue={(value) => internSetStateForm("habilidade", value)}
                    />
                    <TextAreaInput
                        name={"remunerationAndBenefits"}
                        labelText={"Remuneração e benefícios"}
                        callbackChangedValue={(value) => internSetStateForm("remuneracaoBeneficio", value)}
                    />
                </div>
                <div className={stylesCss.divButton}>
                    <Button
                        bgColor={Colors.red.hexadecimal}
                        text={"Concluir cadastro"}
                        textColor={Colors.white.hexadecimal}
                        onClick={() => requestApiNewJob()}
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
            <ReactToast />
            <Footer />
        </div>
    )
}