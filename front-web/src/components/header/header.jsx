import React, { useState } from 'react'
import Button from './../../components/button/button'
import logoVermelha from './../../assets/images/logos/logo-vermelha.png'
import stylesCss from './header.module.css'
import MenuIconHeader from '../menuIconHeader/menuIconHeader'
import {
    breakToken, getRoleInToken
} from './../../services/functions'
import { Colors } from './../../services/constants'
import { Link } from 'react-router-dom'


export default function Header({ typeHeader = false, srcImgUser, callback }) {

    const [typeRender, setTypeRender] = useState("student")

    const listLinks = (type) => {
        switch (type) {
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


    const userLogged = (type) => (
        <div className={stylesCss.userLogged} id={stylesCss[typeHeader + "Style"]}>
            <ul className={stylesCss[typeHeader]}>{(listLinks(type))}</ul>
            <img src={srcImgUser} alt={"Foto usuario x"} />
            <p onClick={() => breakToken()}><Link to="/">sair</Link></p>
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

    const linkRedirectLogoHeader = () => {
        switch (typeHeader) {
            case "student": return "/vagas"
            case "company": return "/gerenciarVagas"
            case "administrator": return "/homeadm"
            case "home": return "/"
            default: return "/"
        }

    }

    const navLinksHeader = () => {
        if (typeHeader === "home") return notLogged
        else if (typeHeader === "company" || typeHeader === "student" || typeHeader === "administrator") return userLogged(typeHeader)
        else return <></>
    }

    //#region Relacionado ao tipo de renderização na home
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
    //#endregion

    return (
        <header className={stylesCss.root}>
            {typeHeader === "home" && studentOrCompanyRenderHome}
            <nav className={stylesCss.navBar}>
                <div>
                    <Link to={linkRedirectLogoHeader()}>
                        <img src={logoVermelha} alt={"Logo vermelho Talentos SENAI"} />
                    </Link>
                </div>
                {typeHeader && <MenuIconHeader typeHeader={typeHeader} />}
                {navLinksHeader()}
            </nav>
        </header>
    )
}
