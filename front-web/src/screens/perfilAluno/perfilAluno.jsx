import React, { useEffect, useState } from 'react'
import Header from './../../components/header/header'
import stylesCss from './perfilAluno.module.css'
import GrayBackgroundProfile from './../../components/grayBackgroundProfile/grayBackgroundProfile'
import fotoUsuario from './../../assets/images/universal/fotoUsuario.jpg'
import { requestAPI } from './../../services/api'
import { getJtiUserInToken } from './../../services/functions'
import { BehavioralProfiles } from './../../services/constants/data'

export default function PerfilAluno() {

    const [dataStudent, setDataStudent] = useState({})

    useEffect(() => {
        getInformationsUser()
    }, [])

    const getInformationsUser = async () => {
        try {
            const request = await requestAPI("get", `/aluno/${getJtiUserInToken()}`)
            console.log(request.data)
            if (request.status === 200) {
                setDataStudent(request.data)
            } else {
                console.log("Deu ruim")
                console.log(request)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const studentAnimalProfile = BehavioralProfiles[dataStudent.perfilComportamental]

    const childUserInformations = () => {
        const { nome, email, telefone } = dataStudent

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
                            src={BehavioralProfiles.Aguia.SrcImgIcon} 
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

    return (
        <div>
            <Header
                typeHeader={"student"}
            />
            <GrayBackgroundProfile srcImgUser={fotoUsuario}>
                {childUserInformations()}
            </GrayBackgroundProfile>
        </div>
    )
}