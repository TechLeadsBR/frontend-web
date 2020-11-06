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

export default function InicialAdm() {

    const [newAdministrator, setNewAdministrator] = useState({})

    const internSetStateForm = (key, value) => setNewAdministrator({ ...newAdministrator, [key]: value })

    const [toastProps, setToastProps] = useState({text: null, visible: false, status: null})
    const [showLoadingIcon, setShowLoadingIcon] = useState(true)
    const [dataGrafic, setDataGrafic] = useState({})

    useEffect(() => {
        let monted = true
        if (monted) {
            getInformationsGrafic()
        }

        return () => monted = false
    }, [])

    const requestNewAdm = async () => {
        try {
            const request = await requestAPI("post", "/administrador", newAdministrator)

            if(request.status === 201){
                setToastProps({status: "success", text: "Administrador Cadastrado", visible: true})
                
                // setTimeout(() => {
                //     history.push("/gerenciar-vagas")
                // }, 2000)
            }else {
                setToastProps({ status: "error", text: "Ocorreu um erro ao cadastrar vaga", visible: true})
            }
            
        } catch (error) {
            setToastProps({status: "error", text: "Ocorreu um erro", visible: true})
        }
    }

    const getInformationsGrafic = async () => {
        try {
            const request = await requestAPI("get", "/metrics")

            if (request.status === 200) {
                setDataGrafic(request.data)
            }
        } catch (error) {
            console.log(error)
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
                    labelText={"Cpf"}
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
            <ReactToast
                visible={toastProps.visible}
                textToast={toastProps.text}
                status={toastProps.status}
            />

            <h1>DashBoard</h1>
            {GraficApplication()}
            <div className={Stylecss.constForms}>
                
                {FormRegisterAdm}
            </div>
            <Footer/>
        </div>
    )
}