import React, { useState } from 'react'
import Button from './../../components/button/button'
import logoVermelha from './../../assets/images/logos/logo-vermelha.png'
import stylesCss from './header.module.css'
import MenuIconHeader from '../menuIconHeader/menuIconHeader'
import { 
    removeInLocalStorage , 
    verifyAuthenticatedUser, 
    getInLocalStorage
} from './../../services/functions'
import { KEY_USER_JWT } from './../../services/constants'
import { Colors } from './../../services/constants'
import { Link } from 'react-router-dom'


export default function Header({ typeHeader=false, srcImgUser, callback }) {

    const [typeRender, setTypeRender] = useState("student")

    const listLinks = () => {
        switch (typeHeader) {
            case "student": return <li><Link to="/">Vagas</Link></li>
            case "company": return <li><Link to="/">Gerenciar Vagas</Link></li>
            case "administrator": {
                return (
                    <>
                        <li><Link to="/">Início</Link></li>
                        <li><Link to="/">Candidatos</Link></li>
                        <li><Link to="/">Empresas</Link></li>
                    </>
                )
            }
            case "home": 
                return (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/cadastro">Cadastre-se</Link></li>
                    </>
                ) 
            default: return <></>
        }
    }

    const userLogged = (
        <div className={stylesCss.userLogged} id={stylesCss[typeHeader + "Style"]}>
            <ul className={stylesCss[typeHeader]}>{(listLinks())}</ul>
            <img src={srcImgUser} alt={"Foto usuario x"} />
            <p onClick={() => removeInLocalStorage(KEY_USER_JWT)}><Link to="/">sair</Link></p>
        </div>
    )

    const notLogged = (
        <div className={stylesCss.notLogged}>
            <b><Link to="/login">Login</Link></b>
            <Button
                textColor={Colors.white.hexadecimal}
                bgColor={Colors.red.hexadecimal}
                text={"Cadastre-se"}
                onClick={() => console.log('Cadastre-se')}
            />
        </div>
    )

    const alternatedRender = (type) => {
        setTypeRender(type)
        callback(type)
    }

    const classBolded = (type) => typeRender === type ? stylesCss.linkBolded : null
    
    const studentOrCompanyRenderHome = (
        <div className={stylesCss.studentOrCompany}>
            <div>
                <div>
                    <p onClick={() => alternatedRender("student")} className={classBolded("student")}>Candidatos</p>
                    <p onClick={() => alternatedRender("company")} className={classBolded("company")}>Empresas</p>
                </div>
            </div>
        </div>
    )

    const linkLogoHeader = () => {
        if (verifyAuthenticatedUser()) {
            const roleUser = getInLocalStorage()
            switch(roleUser){
                case "1": return "/homeadm"
                case "2": return "/vagas"
                case "3": return "/gerenciarVagas"
                default: return "/"
            }
        } else {
            return "/"
        }
    }

    const typeLinksHeader = typeHeader === "home" ? notLogged : 
        typeHeader !== "company" && 
        typeHeader !== "student" && 
        typeHeader !== "administrator" ? null : userLogged

    return (
        <header className={stylesCss.root}>
            {typeHeader === "home" && studentOrCompanyRenderHome}
            <nav className={stylesCss.navBar}>
                <div>
                    <Link to={linkLogoHeader()}>
                        <img src={logoVermelha} alt={"Logo vermelho Talentos SENAI"} />
                    </Link>
                </div>
                {typeHeader && <MenuIconHeader typeHeader={typeRender} />}
                {typeLinksHeader}
            </nav>
        </header>
    )
}
