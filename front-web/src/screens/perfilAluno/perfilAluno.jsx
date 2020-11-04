import React, { useEffect, useState } from 'react'
import Header from './../../components/header/header'
import stylesCss from './perfilAluno.module.css'
import GrayBackgroundProfile from './../../components/grayBackgroundProfile/grayBackgroundProfile'
import CardJob from './../../components/cardJob/cardJob'
import Modal from './../../components/modal/modal'
import LoadingPage from './../../components/loadingPage/loadingPage'
import { formatUrlImage, functionAfterTime } from './../../services/functions'
import { requestAPI } from './../../services/api'
import { BehavioralProfiles } from './../../services/constants/data'

export default function PerfilAluno() {

    const [dataStudent, setDataStudent] = useState({})
    const [userApplications, setUserApplication] = useState([])
    const [animalUser, setAnimalUser] = useState({
        name: null,
        description: null,
        strongPoints: null,
        weaknesses: null,
        srcImgIcon: null
    })
    const [showModalAnimalUser, setShowModalAnimalUser] = useState(false)
    const [showLoadingIcon, setShowLoadingIcon] = useState(true)

    useEffect(() => {
        let monted = true
        if (monted) {
            getInformationsUser()
            requestGetJobApplication()
        }

        return () => monted = false
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
                return BehavioralProfiles.Gato
            default:
                return BehavioralProfiles.Aguia
        }
    }

    const childUserInformations = () => {
        const { nome, email, telefone, perfilComportamental } = dataStudent
        const animalPerfilUser = getStudentAnimalProfile(perfilComportamental)
        
        return (
            <div className={stylesCss.childUserInformations} onLoad={() => {
                const { Description, StrongPoints, SrcImgIcon, Weaknesses } = animalPerfilUser
                setAnimalUser({
                    description: Description,
                    name: perfilComportamental,
                    srcImgIcon: SrcImgIcon,
                    strongPoints: StrongPoints,
                    weaknesses: Weaknesses
                })
            }}>
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
                            src={animalPerfilUser.SrcImgIcon}
                            alt={`Icone ${dataStudent.perfilComportamental}`} 
                            onClick={() => setShowModalAnimalUser(true)} 
                        />
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

    const cardsJobApplication = (
        userApplications && userApplications.map((job, index) => {
            const { descricaoVaga, cidade, nivel, titulo } = job.idVagaEmpregoNavigation
            const { razaoSocial, nomeFoto } = job.idVagaEmpregoNavigation.idEmpresaNavigation
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

    const modalWithJob = (
        showModalAnimalUser && (
            <div className={stylesCss.backgroundModalWithJob}>
            <Modal>
                <div className={stylesCss.contentModalWithJob}>
                    <p onClick={() => setShowModalAnimalUser(false)}>X</p>
                    <div>
                        <h2>Animal predominante</h2>
                        <img 
                            src={animalUser.srcImgIcon} 
                            alt={`Icone animal ${animalUser.name}`} 
                            width={300}     
                        />
                        <b>Descrição</b>
                        <p>{animalUser.description}</p>
                        <b>Pontos Fortes</b>
                        <p>{animalUser.strongPoints}</p>
                        <b>Pontos a melhorar</b>
                        <p>{animalUser.weaknesses}</p>
                    </div>
                </div>
            </Modal>
        </div>
        )
    )

    return (
        <div onLoad={() => functionAfterTime(2000, () => setShowLoadingIcon(false))}>
            <LoadingPage visible={showLoadingIcon} />
            <Header
                typeHeader={"student"}
            />
            <GrayBackgroundProfile srcImgUser={formatUrlImage(dataStudent.nomeFoto)}>
                {childUserInformations()}
            </GrayBackgroundProfile>
            <div className={stylesCss.cardsJobApplication}>
                <h1>Candidaturas</h1>
                <div>
                    {cardsJobApplication}
                </div>
            </div>
            {modalWithJob}
        </div>
    )
}