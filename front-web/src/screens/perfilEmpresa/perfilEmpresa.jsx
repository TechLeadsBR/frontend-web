import React, { useEffect, useState, useMemo } from 'react'
import Header from './../../components/header/header'
import Footer from './../../components/footer/footer'
import CardJob from './../../components/cardJob/cardJob'
import stylesCss from './perfilEmpresa.module.css'
import LoadingPage from './../../components/loadingPage/loadingPage'
import GrayBackgroundProfile from './../../components/grayBackgroundProfile/grayBackgroundProfile'
import { formatUrlImage, functionAfterTime, messageToast } from './../../services/functions'
import { companyActions, jobActions } from './../../actions'

export default function PerfilEmpresa() {
    const [dataCompany, setDataCompany] = useState({})
    const [jobsCompany, setUserApplication] = useState([])
    const [showLoadingIcon, setShowLoadingIcon] = useState(true)

    const setFalseLoadingPage = () => {
        functionAfterTime(2000, () => setShowLoadingIcon(false))
    }

    const getInformationsUser = () => {
        companyActions.getInformationByCompanyId()
            .then(request => request.data)
            .then(data => setDataCompany(data))
            .catch(() => messageToast("Ocorreu um erro em nossos servidores, aguarde um momento", "error"))
    }

    const requestGetJobApplication =  () => {
        jobActions.getJobOpeningsByCompany()
            .then(request => setUserApplication(request.data))
            .catch(() => messageToast("Ocorreu um erro em nossos servidores, aguarde um momento", "error"))
    }

    useEffect(() => {
        setFalseLoadingPage()
        getInformationsUser()
        requestGetJobApplication()
    }, [])

    const childUserInformations = useMemo(() => {
        const { razaoSocial, email, telefone, descricaoEmpresa } = dataCompany
        return (
            <div className={stylesCss.childUserInformations}>
                <div className={stylesCss.userData}>
                    <p><b>{razaoSocial}</b></p>
                    <p><b>Nome:</b> {razaoSocial}</p>
                    <p><b>E-mail:</b> {email}</p>
                    <p><b>Telefone:</b> {telefone}</p>
                </div>
                <div className={stylesCss.behavioralProfile}>
                    <p>Descrição: {descricaoEmpresa} </p>
                </div>
            </div>
        )
    }, [dataCompany])

    const cardsJobApplication = useMemo(() => (
        jobsCompany.map((job, index) => {
            const { descricaoVaga, cidade, nivel, titulo } = job
            const { razaoSocial, nomeFoto } = dataCompany
            return (
                <CardJob
                    key={index}
                    job={{
                        srcImgCompany: formatUrlImage(nomeFoto),
                        title: titulo,
                        local: cidade,
                        level: nivel,
                        nameCompany: razaoSocial,
                        description: descricaoVaga
                    }}
                />
            )
        })
    ), [dataCompany, jobsCompany])

    return (
        <div>
            <LoadingPage visible={showLoadingIcon} />
            <Header
                typeHeader={"company"}
            />
            <GrayBackgroundProfile srcImgUser={formatUrlImage(dataCompany.nomeFoto)}>
                {childUserInformations}
            </GrayBackgroundProfile>
            <div className={stylesCss.cardsJobApplication}>
                <h1>Vagas em Aberto</h1>
                <div>
                    {jobsCompany.length !== 0 ? cardsJobApplication : <small>Nenhuma vaga cadastrada</small>}
                </div>
            </div>
            <Footer />
        </div>

    )

}
