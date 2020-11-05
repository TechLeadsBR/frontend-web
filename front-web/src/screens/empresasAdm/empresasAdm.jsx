import React, { useEffect, useState } from 'react'
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

const companyColumnsTable = ["ID", "RazaoSocial", "Email", "Cnpj", "Telefone", "Telefone 2"]
const jobsColumnsTable = ["ID", "Titulo", "Nivel", "Cidade", "Tipo Contrato", "Remuneracao/ Beneficio"]
const registrationsColumnsTable = ["ID", "Id Vaga de Emprego", "Id Aluno", "Data Inscricao"]

export default function EmpresasAdm() {

    // assets in page
    const [showLoadingPage, setShowLoadingPage] = useState(true)
    const [toastProps, setToastProps] = useState({ text: null, visible: false, status: null })
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

    const toastAfterRequest = (text, status) => {
        setToastProps({ visible: true, text, status })
        setToastProps({ visible: false, text: null, status: null })
    }

    const createObjectForCompanysArray = (data) => {
        const companys = data.map((company) => {
            return {
                idEmpresa: company.idEmpresa,
                razaoSocial: company.razaoSocial,
                email: company.email,
                cnpj: company.cnpj,
                telefone: company.telefone,
                telefoneDois: company.telefoneDois
            }
        })

        setCompanysState(companys)
    }

    const createObjectJobToArrayState = (data) => {
        const jobs = data.map(job => {
            return {
                idVagaEmprego: job.idVagaEmprego,
                titulo: job.titulo,
                nivel: job.nivel,
                cidade: job.cidade,
                tipoContrato: job.tipoContrato,
                remuneracaoBeneficio: job.remuneracaoBeneficio
            }
        })

        setJobsState(jobs)
    }

    const createObjectRegistrationsToArrayState = (data) => {
        const registrations = data.map(registration => {
            return {
                idInscricaoEmprego: registration.idInscricaoEmprego,
                dataInscricao: registration.dataInscricao,
                idAluno: registration.idAluno,
                idVagaEmprego: registration.idVagaEmprego
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
                toastAfterRequest("Empresa atualizada com sucesso!", "success")
                functionAfterTime(1500, () => setShowModalEditCompany(false))
            }
        } catch (error) {
            console.log(error)
            toastAfterRequest("Erro ao atualizar empresa!", "error")
        }
    }

    const getCompanysAPI = async () => {
        try {
            const request = await requestAPI("get", "/empresa")
            if (request.status === 200) {
                createObjectForCompanysArray(request.data)
            }
        } catch (error) {
            toastAfterRequest("Ocorreu algum erro em nossos servidores, aguarde um momento!", "error")
        }
    }

    const deleteCompanyAPI = async () => {
        try {
            const request = await requestAPI("delete", `/empresa/${changeDataCompany.idEmpresa}`)
            if (request.status === 200) {
                toastAfterRequest("Empresa deletada com sucesso!", "success")
                functionAfterTime(1500, () => setShowModalEditCompany(false))
            }
        } catch (error) {
            toastAfterRequest("Parece que essa empresa tem vagas cadastradas!", "error")
        }
    }

    const getJobsAPI = async () => {
        try {
            const request = await requestAPI("get", "/vagaemprego")
            if (request.status === 200) {
                createObjectJobToArrayState(request.data)
            }

        } catch (error) {
            toastAfterRequest("Ocorreu algum erro em nossos servidores, aguarde um momento!", "error")
        }
    }

    const deleteJobAPI = async () => {
        try {
            const request = await requestAPI("delete", `/vagaemprego/${jobIdToDelete}`)

            if (request.status === 200) {
                toastAfterRequest("Vaga de emprego deletada com sucesso!", "success")
                functionAfterTime(1500, () => setShowModalDeleteJobOrRegistrations(false))
            }
        } catch (error) {
            toastAfterRequest("Parece que essa vaga tem inscrições!", "error")
        }
    }

    const getRegistrationsAPI = async () => {
        try {
            const request = await requestAPI("get", "/inscricaoemprego")

            if (request.status === 200) {
                createObjectRegistrationsToArrayState(request.data)
            }
        } catch (error) {
            toastAfterRequest("Ocorreu algum erro em nossos servidores, aguarde um momento!", "error")
        }
    }

    const deleteRegistrationAPI = async () => {
        try {
            const request = await requestAPI("delete", `/inscricaoemprego/${registrationIdToDelete}`)

            if (request.status === 200) {
                toastAfterRequest("Inscrição deletada com sucesso!", "success")
                functionAfterTime(1500, () => setShowModalDeleteJobOrRegistrations(false))
            }
        } catch (error){
            toastAfterRequest("Ocorreu um erro ao excluir essa inscrição!", "error")
        }
    }
    //#endregion

    // call requests api
    useEffect(() => {
        let monted = true

        if (monted && companysState.length === 0) getCompanysAPI()
        if (monted && jobsState.length === 0) functionAfterTime(3000, () => getJobsAPI())
        if (monted && registrationsState.length === 0) functionAfterTime(3000, () => getRegistrationsAPI())

        return () => monted = false
    })

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
            <ReactToast
                textToast={toastProps.text}
                status={toastProps.status}
                visible={toastProps.visible}
            />
            <Footer />
        </div>
    )
}
