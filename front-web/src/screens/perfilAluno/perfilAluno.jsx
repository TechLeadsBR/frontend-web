import React, { useEffect, useState } from 'react'
import Header from './../../components/header/header'
import stylesCss from './perfilAluno.module.css'
import GrayBackgroundProfile from './../../components/grayBackgroundProfile/grayBackgroundProfile'
import fotoUsuario from './../../assets/images/universal/fotoUsuario.jpg'
import { requestAPI } from './../../services/api'
import { BehavioralProfiles } from './../../services/constants/data'
import CardJob from '../../components/cardJob/cardJob'

export default function PerfilAluno() {

    const [dataStudent, setDataStudent] = useState({})
    const [userApplications, setUserApplication] = useState([])

    useEffect(() => {
        getInformationsUser()
        requestGetJobApplication()
    }, [])

    const getInformationsUser = async () => {
        try {
            const request = await requestAPI("get", "/aluno/id")

            if (request.status === 200) {
                setDataStudent(request.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const requestGetJobApplication = async () => {
        try {
            const request = await requestAPI("get", "/inscricaoemprego")

            if (request.status === 200) {
                setUserApplication(request.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getStudentAnimalProfile = (perfilComportamental) => {
        switch (perfilComportamental) {
            case "Aguia":
                return BehavioralProfiles.Aguia
            case "Tubarao":
                return BehavioralProfiles.Tubarao
            case "Lobo":
                return BehavioralProfiles.Lobo
            case "Gato":
                return BehavioralProfiles.Lobo
            default:
                return "asd"
        }
    }

    const childUserInformations = () => {
        const { nome, email, telefone, perfilComportamental } = dataStudent
        const studentProfile = getStudentAnimalProfile(perfilComportamental)

        return (
            <div className={stylesCss.childUserInformations}>
                <div className={stylesCss.userData}>
                    <p>Dados Pessoais</p>
                    <p>Nome: {nome}</p>
                    <p>E-mail: {email}</p>
                    <p>Telefone: {telefone}</p>
                </div>

                <div className={stylesCss.behavioralProfile}>
                    <div>
                        <img
                            className={stylesCss.icon}
                            src={studentProfile.SrcImgIcon}
                            alt={`Icone ${dataStudent.perfilComportamental}`} />
                    </div>
                    <div>
                        <p>Perfil Comportamental</p>
                        <p>Visualizar |</p>
                        <p>Editar</p>
                    </div>
                </div>
            </div>
        )
    }

    const cardsJobApplication = () => {
        return (
            userApplications.map((job, key) => {
                const { descricaoVaga, cidade, nivel, titulo } = job.idVagaEmpregoNavigation
                const { razaoSocial } = job.idVagaEmpregoNavigation.idEmpresaNavigation
                return (
                    <CardJob 
                        job={{ 
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
    }

    return (
        <div>
            <Header
                typeHeader={"student"}
            />
            <GrayBackgroundProfile srcImgUser={fotoUsuario}>
                {childUserInformations()}
            </GrayBackgroundProfile>
            <h1>Candidaturas</h1>
            <div style={{ width: "80%" }}>
                {cardsJobApplication()}
            </div>
        </div>
    )
}