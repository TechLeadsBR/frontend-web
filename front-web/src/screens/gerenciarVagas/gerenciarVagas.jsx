import React, { useEffect, useState, useCallback } from 'react'
import stylesCss from './gerenciarVagas.module.css'
import Header from './../../components/header/header'
import Modal from './../../components/modal/modal'
import CardJob from './../../components/cardJob/cardJob'
import Footer from './../../components/footer/footer'
import Button from '../../components/button/button'
import Input from './../../components/input/input'
import LoadingPage from './../../components/loadingPage/loadingPage'
import TextAreaInput from './../../components/textAreaInput/textAreaInput'
import ReactToast from './../../components/reactToast/reactToast'
import { requestAPI } from '../../services/api'
import { formatUrlImage, functionAfterTime } from './../../services/functions'
import { Link, useHistory } from 'react-router-dom'
import { messageToast } from './../../services/functions'

export default function GerenciarVagas() {

    const history = useHistory()
    const [jobs, setJobs] = useState([])
    const [showLoadingPage, setShowLoadingPage] = useState(true)
    const [showModalEditJob, setShowModalEditJob] = useState(false)
    const [jobEdit, setJobEdit] = useState({})

    const setJobEditState = (key, value) => setJobEdit({ ...jobEdit, [key]: value })

    const getJobs = useCallback(async () => {
        const request = await requestAPI("get", "/vagaemprego/empresa")

        if (request.status === 200) {
            setJobs(request.data)
        }
    }, [])

    useEffect(() => {
        getJobs()
    }, [getJobs])

    //#region Requests
    const updateJobAPI = async () => {
        const { title, description } = jobEdit
        const jobUpdated = {
            descricao: description,
            titulo: title
        }

        try {
            const request = await requestAPI("put", `/vagaemprego/${jobEdit.idVagaEmprego}`, jobUpdated)
            if (request.status === 200) {
                messageToast("Vaga de emprego atualizada com sucesso", "success")
                setShowModalEditJob(false)
            }
        } catch (error) {
            messageToast("Erro ao atualizar vaga de emprego", "error")
        }
    }

    const deleteJobAPI = async () => {
        try {
            const request = await requestAPI("delete", `/vagaemprego/${jobEdit.idVagaEmprego}`)
            if (request.status === 200) {
                messageToast("Vaga excluida com sucesso", "success")
                setShowModalEditJob(false)
            }

        } catch (error) {
            messageToast("Erro ao deletar vaga de emprego", "error")
        }
    }
    //#endregion

    const jobsCompany = (
        jobs && <div className={stylesCss.jobsCompany}>
            {jobs.map((job, index) => {
                const { cidade, descricaoVaga, nivel, titulo, idEmpresaNavigation, idVagaEmprego } = job
                const { nomeFoto, razaoSocial } = idEmpresaNavigation
                return (
                    <CardJob
                        callbackJobInformation={job => {
                            setJobEdit(job)
                            functionAfterTime(1000, () => setShowModalEditJob(true))
                        }}
                        key={index}
                        job={{
                            idVagaEmprego: idVagaEmprego,
                            description: descricaoVaga,
                            level: nivel,
                            local: cidade,
                            nameCompany: razaoSocial,
                            title: titulo,
                            srcImgCompany: formatUrlImage(nomeFoto)
                        }}
                    />
                )
            })}
            <div className={stylesCss.buttonContainer}>
                <Button
                    text={"Cadastrar nova vaga"}
                    onClick={() => history.push("/cadastro-vaga")}
                />
            </div>
        </div>
    )

    const modalEditJob = (
        <div className={stylesCss.backgroundModalEditJob}>
            <Modal styleProps={{ width: "40%" }}>
                <div className={stylesCss.contentModalEditJob}>
                    <p onClick={() => setShowModalEditJob(false)}>X</p>
                    <h2>Editar vaga de emprego</h2>
                    <div>
                        <Input
                            labelText={"Titulo"}
                            name={"tituloJob"}
                            currentValue={jobEdit.title}
                            onChange={event => setJobEditState("title", event.target.value)}
                        />
                        <TextAreaInput
                            currentValue={jobEdit.description}
                            name={"descriptionJob"}
                            labelText={"Descrição"}
                            callbackChangedValue={value => setJobEditState("description", value)}
                        />
                        <div className={stylesCss.divButtonsEditJob}>
                            <Button
                                text={"Atualizar vaga"}
                                onClick={() => updateJobAPI()}
                            />
                            <Button
                                bgColor={"black"}
                                text={"Excluir vaga"}
                                onClick={() => deleteJobAPI()}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )

    const jobsIsNone = (
        <div className={stylesCss.jobsIsNone}>
            <small>Nehuma vaga cadastrada</small>
            <small>Cadastre <Link to="/cadastro-vaga">aqui</Link></small>
        </div>
    )

    return (
        <div className={stylesCss.root}
            onLoad={() => functionAfterTime(4000, () => setShowLoadingPage(false))}>
            <LoadingPage visible={showLoadingPage} />
            <Header typeHeader={"company"} />
            <div className={stylesCss.jobsContainer}>
                {jobs.length !== 0 ? jobsCompany : jobsIsNone}
            </div>
            {showModalEditJob && modalEditJob}
            <Footer />
            <ReactToast />
        </div>
    )
}