import React, { useEffect, useState, useCallback } from 'react'
import stylesCss from './empresasAdm.module.css'
import Header from './../../components/header/header'
import Footer from './../../components/footer/footer'
import Table from './../../components/table/table'
import Modal from './../../components/modal/modal'
import Input from './../../components/input/input'
import Button from './../../components/button/button'
import { requestAPI } from './../../services/api'
import ReactToast from './../../components/reactToast/reactToast'
import { Colors } from './../../services/constants/constants'
import LoadingPage from './../../components/loadingPage/loadingPage'
import { functionAfterTime } from './../../services/functions'
import { messageToast } from './../../services/functions'

const companyColumnsTable = ["ID", "RazaoSocial", "Email", "Cnpj", "Telefone", "Telefone 2"]
const jobsColumnsTable = ["ID", "Titulo", "Nivel", "Cidade", "Tipo Contrato", "Remuneracao/ Beneficio"]
const registrationsColumnsTable = ["ID", "Data Inscrição", "Id Aluno", "Id Vaga de Emprego"]

export default function EmpresasAdm() {

    // assets in page
    const [showLoadingPage, setShowLoadingPage] = useState(true)
    const [typeDelete, setTypeDelete] = useState("JOB")

    // Data
    const [companysState, setCompanysState] = useState([])
    const [jobsState, setJobsState] = useState([])
    const [registrationsState, setRegistrationsState] = useState([])

    // Modal
    const [showModalDeleteJobOrRegistrations, setShowModalDeleteJobOrRegistrations] = useState(false)
    const [showModalEditCompany, setShowModalEditCompany] = useState(false)

    // Put company and job
    const [jobIdToDelete, setJobIdToDelete] = useState(null)
    const [registrationIdToDelete, setRegistrationIdToDelete] = useState(null)
    const [changeDataCompany, setChangeDataCompany] = useState({
        email: null, telefone: null, telefoneDois: null, razaoSocial: null, idEmpresa: null
    })

    const createObjectForCompanysArray = (data) => {
        const companys = data.map((company) => {
            const { idEmpresa, razaoSocial, email, cnpj, telefone, telefoneDois } = company
            return {
                idEmpresa,
                razaoSocial,
                email,
                cnpj,
                telefone,
                telefoneDois
            }
        })

        setCompanysState(companys)
    }

    const createObjectJobToArrayState = (data) => {
        const jobs = data.map(job => {
            const { idVagaEmprego, titulo, nivel, cidade, tipoContrato, remuneracaoBeneficio} = job
            return {
                idVagaEmprego,
                titulo,
                nivel,
                cidade,
                tipoContrato,
                remuneracaoBeneficio
            }
        })

        setJobsState(jobs)
    }

    const createObjectRegistrationsToArrayState = (data) => {
        const registrations = data.map(registration => {
            const { idInscricaoEmprego, dataInscricao, idAluno, idVagaEmprego }  = registration
            return {
                idInscricaoEmprego,
                dataInscricao,
                idAluno,
                idVagaEmprego
            }
        })
        setRegistrationsState(registrations)
    }

    //#region Request API
    const updateCompanyDataAPI = async () => {
        try {
            const { email, telefone, telefoneDois } = changeDataCompany
            const bodyRequestPut = {
                email,
                telefone,
                telefoneDois
            }
            const request = await requestAPI("put", `/empresa/${changeDataCompany.idEmpresa}`, bodyRequestPut)
            if (request.status === 200) {
                messageToast("Empresa atualizada com sucesso!", "success")
                functionAfterTime(1500, () => setShowModalEditCompany(false))
            }
        } catch (error) {
            console.log(error)
            messageToast("Erro ao atualizar empresa!", "error")
        }
    }

    const getCompanysAPI = useCallback(async () => {
        try {
            const request = await requestAPI("get", "/empresa")
            if (request.status === 200) {
                createObjectForCompanysArray(request.data)
            }
        } catch (error) {
            messageToast("Ocorreu algum erro em nossos servidores, aguarde um momento!", "error")
        }
    }, [])

    const deleteCompanyAPI = async () => {
        try {
            const request = await requestAPI("delete", `/empresa/${changeDataCompany.idEmpresa}`)
            if (request.status === 200) {
                messageToast("Empresa deletada com sucesso!", "success")
                functionAfterTime(1500, () => setShowModalEditCompany(false))
            }
        } catch (error) {
            messageToast("Parece que essa empresa tem vagas cadastradas!", "error")
        }
    }

    const getJobsAPI = useCallback(async () => {
        try {
            const request = await requestAPI("get", "/vagaemprego")
            if (request.status === 200) {
                createObjectJobToArrayState(request.data)
            }

        } catch (error) {
            messageToast("Ocorreu algum erro em nossos servidores, aguarde um momento!", "error")
        }
    }, [])

    const deleteJobAPI = async () => {
        try {
            const request = await requestAPI("delete", `/vagaemprego/${jobIdToDelete}`)

            if (request.status === 200) {
                messageToast("Vaga de emprego deletada com sucesso!", "success")
                functionAfterTime(1500, () => setShowModalDeleteJobOrRegistrations(false))
            }
        } catch (error) {
            messageToast("Parece que essa vaga tem inscrições!", "error")
        }
    }

    const getRegistrationsAPI = useCallback(async () => {
        try {
            const request = await requestAPI("get", "/inscricaoemprego")

            if (request.status === 200) {
                createObjectRegistrationsToArrayState(request.data)
            }
        } catch (error) {
            messageToast("Ocorreu algum erro em nossos servidores, aguarde um momento!", "error")
        }
    }, [])

    const deleteRegistrationAPI = async () => {
        try {
            const request = await requestAPI("delete", `/inscricaoemprego/${registrationIdToDelete}`)

            if (request.status === 200) {
                messageToast("Inscrição deletada com sucesso!", "success")
                functionAfterTime(1500, () => setShowModalDeleteJobOrRegistrations(false))
            }
        } catch (error){
            messageToast("Ocorreu um erro ao excluir essa inscrição!", "error")
        }
    }
    //#endregion

    // call requests api
    useEffect(() => {
        getCompanysAPI()
        functionAfterTime(3000, () => getJobsAPI())
        functionAfterTime(3000, () => getRegistrationsAPI())
    }, [getCompanysAPI, getJobsAPI, getRegistrationsAPI])

    const modalForEditCompany = (
        <div className={stylesCss.modalForEditCompany}>
            <Modal styleProps={{ width: "50%" }}>
                <div className={stylesCss.contentModalForEditCompany}>
                    <p onClick={() => setShowModalEditCompany(false)}>X</p>
                    <h2>Editar: {changeDataCompany.razaoSocial}</h2>
                    <form>
                        <Input
                            labelText={"Email"}
                            name={"emailCompany"}
                            type={"email"}
                            onChange={(event) => setChangeDataCompany({
                                ...changeDataCompany,
                                email: event.target.value
                            })}
                            currentValue={changeDataCompany.email}
                        />
                        <Input
                            labelText={"Telefone"}
                            name={"telefoneCompany"}
                            type={"number"}
                            onChange={(event) => setChangeDataCompany({
                                ...changeDataCompany,
                                telefone: event.target.value
                            })}
                            currentValue={changeDataCompany.telefone}
                        />
                        <Input
                            labelText={"Telefone Dois"}
                            name={"telefoneDoisCompany"}
                            type={"number"}
                            onChange={(event) => setChangeDataCompany({
                                ...changeDataCompany,
                                telefoneDois: event.target.value
                            })}
                            currentValue={changeDataCompany.telefoneDois}
                        />
                        <div className={stylesCss.divButton}>
                            <div>
                                <Button
                                    bgColor={Colors.red.hexadecimal}
                                    textColor={Colors.white.hexadecimal}
                                    text={"Alterador dados da empresa"}
                                    onClick={() => updateCompanyDataAPI()}
                                />
                            </div>
                            <div>
                                <Button
                                    bgColor={Colors.matteBlack.hexadecimal}
                                    textColor={Colors.white.hexadecimal}
                                    text={"Deletar empresa"}
                                    onClick={() => deleteCompanyAPI()}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )

    const modalDeleteJob = (
        <div className={stylesCss.modalDeleteJob}>
            <Modal styleProps={{ height: "20vh" }}>
                <div className={stylesCss.contentModalDeleteJob}>
                    <p onClick={() => setShowModalDeleteJobOrRegistrations(false)}>X</p>
                    <Button
                        text={`Deletar ${typeDelete === "JOB" ? "job" : "inscrição"} id: ${typeDelete === "JOB" ? jobIdToDelete : registrationIdToDelete}`}
                        bgColor={Colors.matteBlack.hexadecimal}
                        textColor={Colors.white.hexadecimal}
                        onClick={() => {
                            typeDelete === "JOB" ? deleteJobAPI() : deleteRegistrationAPI()
                        }}
                    />
                </div>
            </Modal>
        </div>
    )

    return (
        <div className={stylesCss.root}
            onLoad={() => functionAfterTime(2000, () => setShowLoadingPage(false))}>
            <LoadingPage visible={showLoadingPage} />
            <Header typeHeader={"administrator"} />
            <div className={stylesCss.content}>
                <Table
                    action={true}
                    title={"Empresas cadastradas"}
                    columnsTable={companyColumnsTable}
                    dataTable={companysState}
                    callbackAction={value => functionAfterTime(1000, () => setShowModalEditCompany(value))}
                    rowSelected={(row) => setChangeDataCompany(row)}
                />
                <Table
                    action={true}
                    title={"Vagas Cadastradas"}
                    columnsTable={jobsColumnsTable}
                    dataTable={jobsState}
                    callbackAction={value => {
                        setTypeDelete("JOB")
                        functionAfterTime(1000, () => setShowModalDeleteJobOrRegistrations(value))
                    }}
                    rowSelected={(row) => setJobIdToDelete(row.idVagaEmprego)}
                    />
                <Table
                    action={true}
                    title={"Inscrições abertas"}
                    columnsTable={registrationsColumnsTable}
                    dataTable={registrationsState}
                    callbackAction={value => {
                        setTypeDelete("REGISTRATION")
                        functionAfterTime(1000, () => setShowModalDeleteJobOrRegistrations(value))
                    }}
                    rowSelected={(row) => setRegistrationIdToDelete(row.idInscricaoEmprego)}
                />
            </div>
            {showModalEditCompany && modalForEditCompany}
            {showModalDeleteJobOrRegistrations && modalDeleteJob}
            <ReactToast />
            <Footer />
        </div>
    )
}
