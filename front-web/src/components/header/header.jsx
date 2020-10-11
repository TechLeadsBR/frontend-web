import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from './../../components/button/button'
import logoVermelha from './../../assets/images/logos/logo-vermelha.png'
import stylesCss from './header.module.css'
import { Colors } from './../../util/constants'

export default function Header({ logged, typeUser, srcImgUser }){

    const history = useHistory()

    const linksNavBarUserLogged = () => {
        
        const listLinks = (
            typeUser === "student" ? <li>Vagas</li> : 
            typeUser === "company" ? <li>Gerenciar Vagas</li> :
            <>
                <li>Início</li>
                <li>Candidatos</li>
                <li>Empresas</li>
            </>
        )

        return (
            <div className={stylesCss.userLogged} typeUserStyle={typeUser}>
                <ul typeUserStyle={typeUser}>{listLinks}</ul>
                <img src={srcImgUser} alt={"Foto usuario x"}/>
                <p>sair</p>
            </div>
        )        
    }

    const userLogged = linksNavBarUserLogged()
        
    const notLogged = (
        <div className={stylesCss.notLogged}>
            <b onClick={() => history.push("/login")}>Login</b>
            <Button 
                textColor={Colors.white}
                bgColor={Colors.red}
                text={"Cadastre-se"}
            />
        </div>
    )

    return (
        <header className={stylesCss.root}>
            <nav className={stylesCss.navBar}>
                <div>
                    <img src={logoVermelha} alt=""/>
                </div>
                {logged ? userLogged : notLogged}
            </nav>
        </header>
    )
}
