import React, { useState, useCallback, useMemo, useEffect } from 'react'
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
    formatedTodayInDate,
    messageToast
} from './../../services/functions'
import { requestAPI } from './../../services/api'

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
        try {
            const request = await requestAPI("get", `/vagaemprego/${valueInput}`)
            if (request.status === 200) {
                if (jobsFiltered.length === 0) setJobsFiltered(request.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const signUpForJob = useCallback(async () => {
        const bodyRequestSignUpJob = {
            dataInscricao: formatedTodayInDate(),
            idAluno: getJtiUserInToken(),
            idVagaEmprego: jobSelectedForViewInModal.idVagaEmprego
        }

        try {
            const request = await requestAPI("post", "/inscricaoemprego", bodyRequestSignUpJob)
            if (request.status === 201) {
                messageToast("Inscrição concluida com sucesso!", "success")
                functionAfterTime(1500, () => setModalViewJobSelected(false))
            }
        } catch (error) {
            messageToast("Parece que você ja se inscreveu nessa vaga!", "error")
        }
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

export default React.memo(BuscarVagas)
