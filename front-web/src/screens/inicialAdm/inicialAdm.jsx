import React, { useEffect, useState, useCallback } from 'react'
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
import { functionAfterTime } from './../../services/functions'
import { formNewAdministrator } from './../../services/constants/templates'
import { messageToast } from './../../services/functions'
import { metricActions, administratorActions } from './../../actions'

const administratorColumnsTable = ["ID", "Nome", "Email", "CPF"]

export default function InicialAdm() {

    const [newAdministrator, setNewAdministrator] = useState(formNewAdministrator)

    const internSetStateForm = (key, value) => setNewAdministrator({ ...newAdministrator, [key]: value })

    const [showLoadingIcon, setShowLoadingIcon] = useState(true)
    const [dataGrafic, setDataGrafic] = useState({})
    const [administratorsState, setAdministratorsState] = useState([])
    const [showModalDeleteAdministrator, setShowModalDeleteAdministrator] = useState(false)
    const [idAdministratorToExclude, setIdAdministratorToExclude] = useState(0)

    const createObjectToDataTableAdministrators = (data) => {
        const administrators = data.map((adm) => {
            const { idAdministrador, email, cpf, nome } = adm
            return {
                idAdministrador,
                nome,
                email,
                cpf,
            }
        })
        setAdministratorsState(administrators)
    }

    //#region Requests
    const requestNewAdmAPI = async () => {
        administratorActions.registerNewAdministrator(newAdministrator)
            .then(() => messageToast("Administrador cadastrado com sucesso!", "success"))
            .catch(() => messageToast("Ocorreu um erro ao cadastrar o novo administrador", "error"))
    }

    const getInformationsGrafic = useCallback(async () => {
        metricActions.getMetrics()
            .then(request => setDataGrafic(request.data))
            .catch(() => messageToast("Ocorreu um erro em nossos servidores, aguarde um momento", "error"))
    }, [])

    const getAdministratorsAPI = useCallback(async () => {
        administratorActions.getAllAdministrators()
            .then(request => createObjectToDataTableAdministrators(request.data))
            .catch(() => messageToast("Ocorreu um erro em nossos servidores, aguarde um momento", "error"))
    }, [])

    const deleteAdministratorAPI = async () => {
        administratorActions.deleteAdministrator(idAdministratorToExclude)
            .then(() => {
                messageToast("Administrador excluido com sucesso!", "success")
                setShowModalDeleteAdministrator(false)
            })
            .catch(() => messageToast("Ocorreu um erro ao excluir administrador, aguarde um momento", "error"))
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

    useEffect(() => {
        getInformationsGrafic()
        getAdministratorsAPI()
    }, [getAdministratorsAPI, getInformationsGrafic])

    const formRegisterAdm = (
        <div className={styleCss.formRegisterAdm}>
            <h1>Cadastrar novo administrador</h1>
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
                        text={"Concluir Cadastro"}
                        onClick={() => requestNewAdmAPI()}
                    />
                </div>
            </form>
        </div>
    )

    const modalDeleteAdministrator = (
        <div className={styleCss.backgroundModalDeleteAdministrator}>
            <Modal styleProps={{ height: "small_height" }}>
                <div className={styleCss.contentModalExcludeAdministrator}>
                    <p onClick={() => setShowModalDeleteAdministrator(false)}>X</p>
                    <Button
                        text={"Delete administrador id: " + idAdministratorToExclude}
                        onClick={() => deleteAdministratorAPI()}
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
