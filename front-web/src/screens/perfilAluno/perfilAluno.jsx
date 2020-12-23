import React, { useEffect, useState, useCallback, useMemo } from 'react'
import Header from './../../components/header/header'
import stylesCss from './perfilAluno.module.css'
import GrayBackgroundProfile from './../../components/grayBackgroundProfile/grayBackgroundProfile'
import CardJob from './../../components/cardJob/cardJob'
import Modal from './../../components/modal/modal'
import LoadingPage from './../../components/loadingPage/loadingPage'
import { formatUrlImage, functionAfterTime } from './../../services/functions'
import { BehavioralProfiles } from './../../services/constants/data'
import { studentActions, jobApplicationActions } from './../../actions'
import { messageToast } from './../../services/functions'

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

    const requestGetJobApplication = useCallback(async () => {
        jobApplicationActions.getJobApplications()
            .then(request => setUserApplication(request.data))
            .catch(() => messageToast("Ocorreu um erro em nossos servidores, aguarde um momento", "error"))
    }, [])

    const getInformationsUser = useCallback(async () => {
        studentActions.getInformationByStudentId()
            .then(request => setDataStudent(request.data))
            .catch(() => messageToast("Ocorreu um erro em nossos servidores, aguarde um momento", "error"))
    }, [])

    const setFalseLoadingPage = useCallback(() => {
        if (Object.keys(dataStudent).length !== 0) functionAfterTime(2000, () => setShowLoadingIcon(false))
    }, [dataStudent])

    useEffect(() => {
        requestGetJobApplication()
        getInformationsUser()
    }, [getInformationsUser, requestGetJobApplication])

    useEffect(() => {
        setFalseLoadingPage()
    }, [setFalseLoadingPage])

    const getStudentAnimalProfile = useCallback((perfilComportamental) => {
        switch (perfilComportamental) {
            case "Aguia":
                return BehavioralProfiles.Eagle
            case "Tubarao":
                return BehavioralProfiles.Shark
            case "Lobo":
                return BehavioralProfiles.Wolf
            case "Gato":
                return BehavioralProfiles.Cat
            default:
                return ""
        }
    }, [])

    const childUserInformations = useMemo(() => {
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
                    <p><b>Nome: </b>{nome}</p>
                    <p><b>E-mail: </b>{email}</p>
                    <p><b>Telefone: </b>{telefone}</p>
                </div>

                <div className={stylesCss.behavioralProfile}>
                    <div>
                        <img
                            className={stylesCss.icon}
                            src={animalPerfilUser.SrcImgIcon}
                            alt={`Icone ${dataStudent.perfilComportamental || "animal"}`}
                            onClick={() => setShowModalAnimalUser(true)}
                        />
                    </div>
                    <div>
                        <p>Perfil Comportamental</p>
                        <p><b>Visualizar </b>|</p>
                        <p><b>Editar</b></p>
                    </div>
                </div>
            </div>
        )
    }, [dataStudent, getStudentAnimalProfile])

    const cardsJobApplication = useMemo(() => (
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
    ), [userApplications])

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
        <div>
            <LoadingPage visible={showLoadingIcon} />
            <Header
                typeHeader={"student"}
            />
            <GrayBackgroundProfile srcImgUser={formatUrlImage(dataStudent.nomeFoto)}>
                {childUserInformations}
            </GrayBackgroundProfile>

            <div className={stylesCss.cardsJobApplication}>
                <h1>Candidaturas</h1>
                <div>
                    {userApplications.length !== 0 ? cardsJobApplication : <small>Nenhuma inscrição feita</small>}
                </div>
            </div>
            {modalWithJob}
        </div>
    )
}
