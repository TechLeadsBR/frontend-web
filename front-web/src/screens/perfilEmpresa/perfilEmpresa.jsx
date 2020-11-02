import React, { useEffect, useState } from 'react'
import Header from './../../components/header/header'
import { requestAPI } from './../../services/api'
import GrayBackgroundProfile from './../../components/grayBackgroundProfile/grayBackgroundProfile'
import stylesCss from './perfilEmpresa.module.css'
import CardJob from './../../components/cardJob/cardJob'
import { formatUrlImage, functionAfterTime } from './../../services/functions'

export default function PerfilEmpresa() {
    const [dataCompany, setDataCompany] = useState({})
    const [jobsCompany, setUserApplication] = useState([])


    useEffect(() => {
        getInformationsUser()
        requestGetJobApplication()
    }, [])

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
                    <p>Dados Pessoais</p>
                    <p>Nome: {razaoSocial}</p>
                    <p>E-mail: {email}</p>
                    <p>Telefone: {telefone}</p>
                </div>

                <div className={stylesCss.behavioralProfile}>
                    <div>
                        <p>Descrição: {descricaoEmpresa} </p>
                    </div>
                </div>
            </div>
        )
    }

    const cardsJobApplication = (
        jobsCompany.map((job, index) => {
            const { descricaoVaga, cidade, nivel, titulo } = job
            const { razaoSocial, nomeFoto } = dataCompany
            const pathImage = formatUrlImage(nomeFoto)
            return (
                <CardJob
                    key={index}
                    job={{
                        srcImgCompany: pathImage,
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
        <div>
            <Header
                typeHeader={"company"}
            />

            <GrayBackgroundProfile srcImgUser={formatUrlImage(dataCompany.nomeFoto)}>
                {childUserInformations()}
            </GrayBackgroundProfile>

            <div className={stylesCss.cardsJobApplication}>
                <h1>Candidaturas</h1>
                <div>
                    {cardsJobApplication}
                </div>
            </div>
        </div>

    )

}