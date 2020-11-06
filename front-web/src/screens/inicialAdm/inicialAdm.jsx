import React, { useEffect, useState } from 'react'
import Header from '../../components/header/header'
import Grafic from '../../components/Grafic/Grafic'
import LoadingPage from './../../components/loadingPage/loadingPage'
import Stylecss from './inicialAdm.module.css'
import Input from './../../components/input/input'
import Button from './../../components/button/button'
import Footer from './../../components/footer/footer'
import ReactToast from './../../components/reactToast/reactToast'
import { Colors } from './../../services/constants/constants'
import { requestAPI } from './../../services/api'
import { functionAfterTime } from './../../services/functions'
import { formNewAdministrator } from './../../services/constants/templates'

export default function InicialAdm() {

    const [newAdministrator, setNewAdministrator] = useState(formNewAdministrator)

    const internSetStateForm = (key, value) => setNewAdministrator({ ...newAdministrator, [key]: value })

    const [toastProps, setToastProps] = useState({text: null, visible: false, status: null})
    const [showLoadingIcon, setShowLoadingIcon] = useState(true)
    const [dataGrafic, setDataGrafic] = useState({})

    useEffect(() => {
        let monted = true
        if (monted && Object.keys(dataGrafic).length === 0) getInformationsGrafic()
        return () => monted = false
    }, [])

    const toastAfterRequest = (text, status) => {
        setToastProps({ visible: true, text, status })
        functionAfterTime(3000, () => setToastProps({ visible: false, text: null, status: null }))
    }

    const requestNewAdm = async () => {
        try {
            const request = await requestAPI("post", "/administrador", newAdministrator)

            if(request.status === 201){
                toastAfterRequest("Administrador cadastrado com sucesso!", "success")
            }
        } catch (error) {
            toastAfterRequest("Ocorreu um erro ao cadastrar o novo administrador", "error")
        }
    }

    const getInformationsGrafic = async () => {
        try {
            const request = await requestAPI("get", "/metrics")

            if (request.status === 200) {
                setDataGrafic(request.data)
            }
        } catch (error) {
            toastAfterRequest("Ocorreu um erro em nossos servidores, aguarde um momento", "error")
        }
    }

    const GraficApplication = () => {
        const { aluno, empresa, vagas, inscricoes } = dataGrafic

        const data = [
            ['Tipos', 'Quantidade'],
            ['Alunos', Number(aluno)],
            ['Empresas', Number(empresa)],
            ['Vagas', Number(vagas)],
            ['Inscrições', Number(inscricoes)]
        ]

        return (
            <Grafic data={data} />
        )
    }

    const FormRegisterAdm = (
        <div className={Stylecss.formRegisterAdm}>
            <h1>Cadastro Administrador</h1>
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
                    type={"email"}
                    onChange={event => internSetStateForm("email", event.target.value)}
                />
                <Input
                    labelText={"Senha"}
                    name={"password"}
                    type={"password"}
                    onChange={event => internSetStateForm("senha", event.target.value)}
                />
                <Input
                    labelText={"CPF"}
                    name={"cpf"}
                    type={"text"}
                    onChange={event => internSetStateForm("cpf", event.target.value)}
                />

                <div className={Stylecss.divButton}>
                    <Button
                        bgColor={Colors.red.hexadecimal}
                        text={"Concluir Cadastro"}
                        textColor={Colors.white.hexadecimal}
                        onClick={() => requestNewAdm()}
                    />
                </div>
            </form>
        </div>
    )

    return (
        <div onLoad={() => functionAfterTime(2000, () => setShowLoadingIcon(false))}>
            <LoadingPage visible={showLoadingIcon} />
            <Header typeHeader="administrator" />
            <h1>DashBoard</h1>
            {GraficApplication()}
            <div className={Stylecss.constForms}>
                {FormRegisterAdm}
            </div>
            <Footer/>
            <ReactToast
                visible={toastProps.visible}
                textToast={toastProps.text}
                status={toastProps.status}
            />
        </div>
    )
}