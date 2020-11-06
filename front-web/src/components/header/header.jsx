import React, { useState } from 'react'
import Button from './../../components/button/button'
import logoVermelha from './../../assets/images/logos/logo-vermelha-talentos-senai.png'
import stylesCss from './header.module.css'
import MenuIconHeader from '../menuIconHeader/menuIconHeader'
import { breakToken } from './../../services/functions'
import { Colors } from '../../services/constants/constants'
import { Link, useHistory } from 'react-router-dom'


export default function Header({ typeHeader = null, srcImgUser, callback }) {

    const [typeRender, setTypeRender] = useState("student")
    const history = useHistory()

    const listLinks = (type) => {
        switch (type) {
            case "student": return <li><Link to="/">Vagas</Link></li>
            case "company": return <li><Link to="/">Gerenciar Vagas</Link></li>
            case "administrator": {
                return (
                    <>
                        <li><Link to="/">Início</Link></li>
                        <li><Link to="/candidatos-adm">Candidatos</Link></li>
                        <li><Link to="/empresas-adm">Empresas</Link></li>
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
            {(type === "student" || type === "company") && <img src={srcImgUser} alt={"Foto usuario x"} />}
            <p onClick={() => breakToken()}><Link to="/">sair</Link></p>
        </div>
    )

    const notLogged = (
        <div className={stylesCss.notLogged}>
            <b><Link to={`/login/${typeRender === "student" ? "aluno" : "empresa"}`}>Login</Link></b>
            <Button
                textColor={Colors.white.hexadecimal}
                bgColor={typeRender === "student" ? Colors.red.hexadecimal : Colors.matteBlack.hexadecimal}
                text={"Cadastre-se"}
                onClick={() => {
                    const toRegister = typeRender === "student" ? "aluno" : "empresa"
                    history.push(`/inicio-cadastro/${toRegister}`)
                }}
            />
        </div>
    )

    const linkRedirectLogoHeader = (type) => {
        switch (type) {
            case "student": return "/vagas"
            case "company": return "/gerenciar-vagas"
            case "administrator": return "/home-adm"
            case "home": return "/"
            default: return "/"
        }

    }

    const navLinksHeader = (type) => {
        if (type === "home") return notLogged
        else if (type === "company" || type === "student" || type === "administrator") return userLogged(type)
        else return <></>
    }

    //#region Relacionado ao tipo de renderização na home
    const alternatedRender = (type) => {
        setTypeRender(type)
        if(callback) callback(type)
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
                    <Link to={linkRedirectLogoHeader(typeHeader)}>
                        <img src={logoVermelha} alt={"Logo vermelho Talentos SENAI"} />
                    </Link>
                </div>
                {typeHeader && <MenuIconHeader typeHeader={typeHeader} />}
                {navLinksHeader(typeHeader)}
            </nav>
        </header>
    )
}
