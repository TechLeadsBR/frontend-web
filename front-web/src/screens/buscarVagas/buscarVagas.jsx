import React, { useState } from 'react'
import stylesCss from './buscarVagas.module.css'
import Header from './../../components/header/header'
import Footer from './../../components/footer/footer'
import SearchJobs from './../../components/searchJobs/searchJobs'
import LoadingPage from './../../components/loadingPage/loadingPage'
import CardJob from './../../components/cardJob/cardJob'
import { functionAfterTime, formatUrlImage } from './../../services/functions'
import { requestAPI } from './../../services/api'

export default function BuscarVagas() {

    const [showIconLoagingPage, setShowIconLoadingPage] = useState(true)
    const [valueInput, setValueInput] = useState("")
    const [jobsFiltered, setJobsFiltered] = useState([])

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

    const createCardJobsFiltered = (
        jobsFiltered && jobsFiltered.map((job, index) => {
            const { idEmpresaNavigation, descricaoVaga, nivel, cidade, titulo } = job
            const { nomeFoto, razaoSocial } = idEmpresaNavigation
            return (
                <CardJob
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
    )

    return (
        <div onLoad={() => functionAfterTime(2000, () => setShowIconLoadingPage(false))}>
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
                    {jobsFiltered ? createCardJobsFiltered : (
                        <small>Nenhuma vaga pesquisada...</small>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}   