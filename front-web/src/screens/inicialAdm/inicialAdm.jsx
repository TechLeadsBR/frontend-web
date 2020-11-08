import React, { useEffect, useState } from 'react'
import Header from '../../components/header/header'
import Grafic from '../../components/grafic/grafic'
import LoadingPage from './../../components/loadingPage/loadingPage'
import styleCss from './inicialAdm.module.css'
import Input from './../../components/input/input'
import Button from './../../components/button/button'
import Footer from './../../components/footer/footer'
import ReactToast from './../../components/reactToast/reactToast'
import Table from './../../components/table/table'
import Modal from './../../components/modal/modal'
import { Colors } from './../../services/constants/constants'
import { requestAPI } from './../../services/api'
import { functionAfterTime } from './../../services/functions'
import { formNewAdministrator } from './../../services/constants/templates'
import { messageToast } from './../../services/functions'

const administratorColumnsTable = ["ID", "Nome", "Email", "CPF"]

export default function InicialAdm() {

    const [newAdministrator, setNewAdministrator] = useState(formNewAdministrator)

    const internSetStateForm = (key, value) => setNewAdministrator({ ...newAdministrator, [key]: value })

    const [showLoadingIcon, setShowLoadingIcon] = useState(true)
    const [dataGrafic, setDataGrafic] = useState({})
    const [administratorsState, setAdministratorsState] = useState([])
    const [showModalDeleteAdministrator, setShowModalDeleteAdministrator] = useState(false)
    const [idAdministratorToExclude, setIdAdministratorToExclude] = useState(0)

    useEffect(() => {
        let monted = true
        if (monted && Object.keys(dataGrafic).length === 0) getInformationsGrafic()
        if (monted) getAdministratorsAPI()
        return () => monted = false
    }, [])

    const createObjectToDataTableAdministrators = (data) => {
        const administrators = data.map((adm) => {
            const { idAdministrador, email, cpf, nome } = adm
            return {
                idAdministrador,
                email,
                cpf,
                nome
            }
        })
        setAdministratorsState(administrators)
    }

    //#region Requests
    const requestNewAdmAPI = async () => {
        try {
            const request = await requestAPI("post", "/administrador", newAdministrator)

            if (request.status === 201) {
                messageToast("Administrador cadastrado com sucesso!")
            }
        } catch (error) {
            messageToast("Ocorreu um erro ao cadastrar o novo administrador")
        }
    }

    const getInformationsGrafic = async () => {
        try {
            const request = await requestAPI("get", "/metrics")

            if (request.status === 200) {
                setDataGrafic(request.data)
            }
        } catch (error) {
            messageToast("Ocorreu um erro em nossos servidores, aguarde um momento")
        }
    }

    const getAdministratorsAPI = async () => {
        try {
            const request = await requestAPI("get", "/administrador")
            if (request.status === 200) createObjectToDataTableAdministrators(request.data)
        } catch (error) {
            messageToast("Ocorreu um erro em nossos servidores, aguarde um momento")
        }
    }

    const deleteAdministratorAPI = async () => {
        try {
            const request = await requestAPI("delete", `/administrador/${idAdministratorToExclude}`)

            if (request.status === 200) {
                messageToast("Administrador excluido com sucesso!")
                setShowModalDeleteAdministrator(false)
            }
        } catch (error) {
            messageToast("Ocorreu um erro ao excluir administrador, aguarde um momento")
        }
    }
    //#endregion

    const graficApplication = () => {
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

    const formRegisterAdm = (
        <div className={styleCss.formRegisterAdm}>
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
                <div className={styleCss.divButton}>
                    <Button
                        bgColor={Colors.red.hexadecimal}
                        text={"Concluir Cadastro"}
                        textColor={Colors.white.hexadecimal}
                        onClick={() => requestNewAdmAPI()}
                    />
                </div>
            </form>
        </div>
    )

    const modalDeleteAdministrator = (
        <div className={styleCss.backgroundModalDeleteAdministrator}>
            <Modal styleProps={{ height: "20vh" }}>
                <div className={styleCss.contentModalExcludeAdministrator}>
                    <p onClick={() => setShowModalDeleteAdministrator(false)}>X</p>
                    <Button
                        text={"Delete administrador id: " + idAdministratorToExclude}
                        onClick={() => deleteAdministratorAPI()}
                        bgColor={Colors.red.hexadecimal}
                        textColor={Colors.white.hexadecimal}
                    />
                </div>
            </Modal>
        </div>
    )

    return (
        <div onLoad={() => functionAfterTime(2000, () => setShowLoadingIcon(false))}>
            <LoadingPage visible={showLoadingIcon} />
            <Header typeHeader="administrator" />
            <h1>DashBoard</h1>
            {graficApplication()}
            <div className={styleCss.table}>
                <div className={styleCss.divTable}>
                    <Table
                        title={"Administradores"}
                        columnsTable={administratorColumnsTable}
                        action={true}
                        dataTable={administratorsState}
                        callbackAction={value => setShowModalDeleteAdministrator(value)}
                        rowSelected={row => setIdAdministratorToExclude(row.idAdministrador)}
                    />
                </div>
            </div>
            {showModalDeleteAdministrator && modalDeleteAdministrator}
            <div className={styleCss.constForms}>
                {formRegisterAdm}
            </div>
            <Footer />
            <ReactToast />
        </div>
    )
}
