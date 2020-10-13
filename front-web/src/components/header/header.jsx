import React, { useState } from 'react'
import Button from './../../components/button/button'
import logoVermelha from './../../assets/images/logos/logo-vermelha.png'
import { removeInLocalStorage } from './../../services/functions'
import { KEY_USER_JWT } from './../../services/constants'
import stylesCss from './header.module.css'
import { Colors } from './../../services/constants'
import { Link } from 'react-router-dom'
import MenuIconHeader from '../menuIconHeader/menuIconHeader'


export default function Header({ logged=false, typeUser, srcImgUser, home=false, callback }) {

    const [typeRender, setTypeRender] = useState("student")

    const listLinks = (
        typeUser === "student" ?
            <li><Link to="/">Vagas</Link></li>
            :
            typeUser === "company" ?
                <li><Link to="/">Gerenciar Vagas</Link></li>
                :
                <>
                    <li><Link to="/">Início</Link></li>
                    <li><Link to="/">Candidatos</Link></li>
                    <li><Link to="/">Empresas</Link></li>
                </>
    )

    const userLogged = (
        <div className={stylesCss.userLogged} id={stylesCss[typeUser + "Style"]}>
            <ul className={stylesCss[typeUser]}>{listLinks}</ul>
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


    return (
        <header className={stylesCss.root}>
            {home ? studentOrCompany : null}
            <nav className={stylesCss.navBar}>
                <div>
                    <Link to="/">
                        <img src={logoVermelha} alt={"Logo vermelho Talentos SENAI"} />
                    </Link>
                </div>
                <MenuIconHeader
                    links={listLinks}
                />
                {logged ? userLogged : notLogged}
            </nav>
        </header>
    )
}
