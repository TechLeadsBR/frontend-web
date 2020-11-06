import React, { useEffect, useState } from 'react'
import Header from './../../components/header/header'
import CardJob from './../../components/cardJob/cardJob'
import stylesCss from './perfilEmpresa.module.css'
import LoadingPage from './../../components/loadingPage/loadingPage'
import GrayBackgroundProfile from './../../components/grayBackgroundProfile/grayBackgroundProfile'
import { requestAPI } from './../../services/api'
import { formatUrlImage, functionAfterTime } from './../../services/functions'

export default function PerfilEmpresa() {
    const [dataCompany, setDataCompany] = useState({})
    const [jobsCompany, setUserApplication] = useState([])
    const [showLoadingIcon, setShowLoadingIcon] = useState(true)

    useEffect(() => {
        let monted = true

        if(monted && Object.keys(dataCompany).length === 0) getInformationsUser()
        if(monted && jobsCompany.length === 0) requestGetJobApplication()
            
        return () => monted = false
    })

    const getInformationsUser = async () => {
        try {
            const request = await requestAPI("get", "/empresa/id")

            if (request.status === 200) {
                setDataCompany(request.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const requestGetJobApplication = async () => {
        try {
            const request = await requestAPI("get", "/vagaemprego/empresa")

            if (request.status === 200) {
                setUserApplication(request.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const childUserInformations = () => {
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
    }

    const cardsJobApplication = (
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
    )


    return (
        <div onLoad={() => {
            if(Object.keys(dataCompany).length !== 0) functionAfterTime(2000, () => setShowLoadingIcon(false))
        }}>
            <LoadingPage visible={showLoadingIcon} />
            <Header
                typeHeader={"company"}
            />
            <GrayBackgroundProfile srcImgUser={formatUrlImage(dataCompany.nomeFoto)}>
                {childUserInformations()}
            </GrayBackgroundProfile>
            <div className={stylesCss.cardsJobApplication}>
                <h1>Vagas em Aberto</h1>
                <div>
                    {jobsCompany.length !== 0 ? cardsJobApplication : <small>Nenhuma vaga cadastrada</small>}
                </div>
            </div>
        </div>

    )

}