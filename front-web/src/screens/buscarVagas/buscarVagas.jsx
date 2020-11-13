import React, { useState, useCallback, useMemo, useEffect, memo } from 'react'
import stylesCss from './buscarVagas.module.css'
import Header from './../../components/header/header'
import Footer from './../../components/footer/footer'
import Modal from './../../components/modal/modal'
import SearchJobs from './../../components/searchJobs/searchJobs'
import Button from './../../components/button/button'
import LoadingPage from './../../components/loadingPage/loadingPage'
import CardJob from './../../components/cardJob/cardJob'
import ReactToast from './../../components/reactToast/reactToast'
import {
    functionAfterTime,
    formatUrlImage,
    getJtiUserInToken,
    messageToast
} from './../../services/functions'
import { jobActions, jobApplicationActions } from './../../actions'

function BuscarVagas() {

    const [showIconLoagingPage, setShowIconLoadingPage] = useState(true)
    const [valueInput, setValueInput] = useState("")
    const [modalViewJobSelected, setModalViewJobSelected] = useState(false)
    const [jobSelectedForViewInModal, setJobSelectedForViewInModal] = useState({})
    const [jobsFiltered, setJobsFiltered] = useState([])

    const setFalseLoadingPage = useCallback(() => {
        functionAfterTime(2000, () => setShowIconLoadingPage(false))
    }, [])

    useEffect(() => {
        setFalseLoadingPage()
    }, [setFalseLoadingPage])


    const getJobsFiltered = async () => {

        jobActions.filterJobs(valueInput)
            .then((request) => {
                if (jobsFiltered.length === 0) setJobsFiltered(request.data)
            })
            .catch(() => messageToast("Ocorreu um erro ao buscar as vagas, aguarde um momento", "error"))
    }

    const signUpForJob = useCallback(() => {
        const idAluno = getJtiUserInToken()
        const idVagaEmprego = jobSelectedForViewInModal.idVagaEmprego

        jobApplicationActions.registerNewJobApplication(idAluno, idVagaEmprego)
            .then(() => {
                messageToast("Inscrição concluida com sucesso!", "success")
                functionAfterTime(1500, () => setModalViewJobSelected(false))
            })
            .catch(() => messageToast("Parece que você ja se inscreveu nessa vaga!", "error"))
    }, [jobSelectedForViewInModal.idVagaEmprego])

    const createCardJobsFiltered = useMemo(() => (
        jobsFiltered && jobsFiltered.map((job, index) => {
            const { idEmpresaNavigation, descricaoVaga, nivel, cidade, titulo, idVagaEmprego } = job
            const { nomeFoto, razaoSocial } = idEmpresaNavigation
            return (
                <CardJob
                    callbackJobInformation={job => {
                        setJobSelectedForViewInModal({ ...job, idVagaEmprego })
                        setModalViewJobSelected(true)
                    }}
                    key={index}
                    job={{
                        title: titulo,
                        srcImgCompany: formatUrlImage(nomeFoto),
                        description: descricaoVaga,
                        level: nivel,
                        local: cidade,
                        nameCompany: razaoSocial,
                    }}
                />
            )
        })
    ), [jobsFiltered])

    const modalWithJobSelected = useMemo(() => {
        const { srcImgCompany, nameCompany, title, description, level } = jobSelectedForViewInModal
        return (
            modalViewJobSelected && (
                <div className={stylesCss.backgroundModalWithJob}>
                    <Modal styleProps={{ width: "60vh" }}>
                        <div className={stylesCss.contentModalWithJob}>
                            <p onClick={() => setModalViewJobSelected(false)}>X</p>
                            <div>
                                <h2>{title}</h2>
                                <img
                                    src={srcImgCompany}
                                    alt={`Foto empresa ${nameCompany}`}
                                    width={300}
                                />
                            </div>
                            <div className={stylesCss.detailsJob}>
                                <div>
                                    <b>Descrição</b>
                                    <p>{description}</p>
                                </div>
                                <div>
                                    <b>Nível</b>
                                    <p>{level}</p>
                                </div>
                            </div>
                        </div>
                        <div className={stylesCss.buttonContent}>
                            <Button
                                text={"Candidatar-se"}
                                bgColor={"red"}
                                onClick={() => signUpForJob()}
                            />
                        </div>
                    </Modal>
                </div>
            )
        )
    }, [jobSelectedForViewInModal, modalViewJobSelected, signUpForJob])

    return (
        <div>
            <LoadingPage visible={showIconLoagingPage} />
            <Header typeHeader={"student"} />
            <SearchJobs
                callbackValue={value => {
                    setValueInput(value)
                    functionAfterTime(1000, () => getJobsFiltered())
                }}
            />
            <div className={stylesCss.jobsFiltered}>
                {jobsFiltered.length !== 0 && <b>Vagas disponíveis</b>}
                <div className={stylesCss.jobsContainer}>
                    {jobsFiltered.length !== 0 ? createCardJobsFiltered : (
                        <small>Nenhuma vaga encontrada...</small>
                    )}
                </div>
            </div>
            {modalViewJobSelected && modalWithJobSelected}
            <ReactToast />
            <Footer />
        </div>
    )
}

export default memo(BuscarVagas)
