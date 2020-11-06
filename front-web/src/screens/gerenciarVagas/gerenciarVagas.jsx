import React, { useEffect, useState } from 'react'
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
import { Colors } from './../../services/constants/constants'
import { Link, useHistory } from 'react-router-dom'

export default function GerenciarVagas(){

    const history = useHistory()
    const [jobs, setJobs] = useState([])
    const [toastProps, setToastProps] = useState({ text: null, visible: false, status: null })
    const [showLoadingPage, setShowLoadingPage] = useState(true)
    const [showModalEditJob, setShowModalEditJob] = useState(false)
    const [jobEdit, setJobEdit] = useState({})

    const setJobEditState = (key, value) => setJobEdit({ ...jobEdit, [key]: value  })

    useEffect(() => {
        let monted = true
        if (monted) {
            const getJobs = async () => {
                const request = await requestAPI("get", "/vagaemprego/empresa")
        
                if(request.status === 200) {
                    setJobs(request.data)
                }
            }
            getJobs()
        }
        return () => monted = false
    }, [])

    const toastFunction = (text, status="error") => {
        setToastProps({ visible: true, text, status })
        functionAfterTime(3000, () => setToastProps({ visible: false, text: null, status: null }))
    }

    //#region Requests
    const updateJobAPI = async () => {
        const { title, description } = jobEdit
        const jobUpdated = {
            descricao: description, 
            titulo: title
        }

        try {
            const request = await requestAPI("put", `/vagaemprego/${jobEdit.idVagaEmprego}`, jobUpdated)

            if(request.status === 200) {
                toastfunc
            }
        } catch (error) {
            toastFunction("Erro ao atualizar vaga de emprego")
        }
    }

    const jobsCompany = (
        jobs && <div className={stylesCss.jobsCompany}>
            {jobs.map((job, index) => {
                const { cidade, descricaoVaga, nivel, titulo, idEmpresaNavigation, idVagaEmprego } = job
                const { nomeFoto, razaoSocial } = idEmpresaNavigation
                return (
                    <CardJob
                        callbackJobInformation={job => {
                            setJobEdit(job)
                            console.log(job)
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
                    bgColor={Colors.red.hexadecimal}
                    textColor={Colors.white.hexadecimal}
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
                        <Button 
                            bgColor={Colors.red.hexadecimal}
                            textColor={Colors.white.hexadecimal}
                            text={"Atualizar vaga"}
                            onClick={() => updateJobAPI()}
                        />
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
            onLoad={() => {
                if (jobs.length !== 0) setShowLoadingPage(false)
            }}
        >
            <LoadingPage visible={showLoadingPage} />
            <Header typeHeader={"company"} />
            <div className={stylesCss.jobsContainer}>
                {jobs.length !== 0 ? jobsCompany : jobsIsNone}
            </div>
            {showModalEditJob && modalEditJob}
            <Footer />
            <ReactToast
                textToast={toastProps.text}
                visible={toastProps.visible}
                status={toastProps.status}
            />
        </div>
    )
}