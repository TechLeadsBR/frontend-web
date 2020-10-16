import React, { useState } from 'react'
import Button from './../../components/button/button'
import logoVermelha from './../../assets/images/logos/logo-vermelha.png'
import stylesCss from './header.module.css'
import MenuIconHeader from '../menuIconHeader/menuIconHeader'
import { removeInLocalStorage , verifyAuthenticatedUser, getInLocalStorage, decryptPayloadJwtAndReturnObject } from './../../services/functions'
import { KEY_USER_JWT } from './../../services/constants'
import { Colors } from './../../services/constants'
import { Link } from 'react-router-dom'


export default function Header({ typeUser=false, srcImgUser, home = false, callback }) {

    const [typeRender, setTypeRender] = useState("student")

    const listLinks = () => {
        switch (typeUser) {
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
            default: return <></>
        }
    }

    const userLogged = (
        <div className={stylesCss.userLogged} id={stylesCss[typeUser + "Style"]}>
            <ul className={stylesCss[typeUser]}>{(listLinks())}</ul>
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

    const studentOrCompany = (
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
            const token = getInLocalStorage(KEY_USER_JWT)
            const roleUser = decryptPayloadJwtAndReturnObject(token).Role

            if (roleUser === "1") return "/homeadm"
            else if (roleUser === "2") return "/vagas"
            else if (roleUser === "3") return "/gerenciarvagas"
            else {
                console.log(roleUser)
                return "/"
            }
        } else {
            return "/"
        }
    }

    return (
        <header className={stylesCss.root}>
            {home && studentOrCompany}
            <nav className={stylesCss.navBar}>
                <div>
                    <Link to={linkLogoHeader()}>
                        <img src={logoVermelha} alt={"Logo vermelho Talentos SENAI"} />
                    </Link>
                </div>
                <MenuIconHeader
                    links={listLinks()}
                />
                {typeUser ? userLogged : notLogged}
            </nav>
        </header>
    )
}
