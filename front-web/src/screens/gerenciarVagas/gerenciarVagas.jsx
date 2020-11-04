import React, { useEffect, useState } from 'react'
import stylesCss from './gerenciarVagas.module.css'
import Header from '../../components/header/header'
import CardJob from '../../components/cardJob/cardJob'
import Footer from '../../components/footer/footer'
import { requestAPI } from '../../services/api'
import { formatUrlImage, functionAfterTime } from './../../services/functions'
import LoadingPage from './../../components/loadingPage/loadingPage'
import { Link, useHistory } from 'react-router-dom'
import Button from '../../components/button/button'
import { Colors } from './../../services/constants/constants'

export default function GerenciarVagas(){

    const history = useHistory()
    const [jobs, setJobs] = useState([])
    const [showLoadingPage, setShowLoadingPage] = useState(true)

    const getJobs = async () => {
        const request = await requestAPI("get", "/vagaemprego/empresa")

        if(request.status === 200) {
            setJobs(request.data)
        }
    }

    useEffect(() => {
        let monted = true
        if (monted) getJobs()

        return () => monted = false
    }, [])

    const jobsCompany = (
        jobs && <div className={stylesCss.jobsCompany}>
            {jobs.map((job, index) => {
                const { cidade, descricaoVaga, nivel, titulo, idEmpresaNavigation } = job
                const { nomeFoto, razaoSocial } = idEmpresaNavigation
                return (
                    <CardJob
                        key={index}
                        job={{
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

    const jobsIsNone = (
        <div className={stylesCss.jobsIsNone}>
            <small>Nehuma vaga cadastrada</small>
            <small>Cadastre <Link to="/cadastro-vaga">aqui</Link></small>
        </div>
    )

    return (
        <div className={stylesCss.root} 
            onLoad={() => functionAfterTime(2000, () => setShowLoadingPage(false))}
        >
            <LoadingPage visible={showLoadingPage} />
            <Header typeHeader={"company"} />
            <div className={stylesCss.jobsContainer}>
                {jobs.length !== 0 ? jobsCompany : jobsIsNone}
            </div>
            <Footer />
        </div>
    )
}