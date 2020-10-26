import React from 'react'
import Header from './../../components/header/header'
import stylesCss from './perfilAluno.module.css'
import GrayBackgroundProfile from './../../components/grayBackgroundProfile/grayBackgroundProfile'
import fotoUsuario from './../../assets/images/universal/fotoUsuario.jpg'
import imgIconAnimal from './../../assets/images/icons/iconAnimal.png'
import { requestAPI } from './../../services/api'
    
export default function PerfilAluno() {


    const childGrayBackground = (
        <div className={stylesCss.childGrayBackground}>
            <div className={stylesCss.userData}>
                <p>Dados Pessoais</p>
                <p>Nome: Pedro</p>
                <p>E-mail: Pedro@gmail.com</p>
                <p>Telefone: (11)9999-9999</p>
            </div>

            <div className={stylesCss.behavioralProfile}>
                <div>
                    <img className={stylesCss.icon} src={imgIconAnimal} alt="Icone Animal do Perfil Comportamental" />
                </div>
                <div>
                    <p>Perfil Comportamental</p>
                    <p>Visualizar |</p>
                    <p>Editar</p>
                </div>
            </div>
        </div>
    )

    return (
        <div>
            <Header
                typeHeader={"student"}
            />
            <GrayBackgroundProfile srcImgUser={fotoUsuario}>
                {childGrayBackground}
            </GrayBackgroundProfile>
        </div>
    )
}