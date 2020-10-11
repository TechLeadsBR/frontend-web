import React from 'react'
import Button from './../../components/button/button'
import logoVermelha from './../../assets/images/logos/logo-vermelha.png'
import { removeInLocalStorage } from './../../util/functions'
import { KEY_USER_JWT } from './../../util/constants'
import stylesCss from './header.module.css'
import { Colors } from './../../util/constants'
import { Link } from 'react-router-dom'
import MenuIconHeader from '../menuIconHeader/menuIconHeader'


export default function Header({ logged=false, typeUser, srcImgUser }) {

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
                textColor={Colors.white}
                bgColor={Colors.red}
                text={"Cadastre-se"}
                onClick={() => console.log('Cadastre-se')}
            />
        </div>
    )


    return (
        <header className={stylesCss.root}>
            <nav className={stylesCss.navBar}>
                <div>
                    <img src={logoVermelha} alt="" />
                </div>
                <MenuIconHeader
                    links={listLinks}
                />
                {logged ? userLogged : notLogged}
            </nav>
        </header>
    )
}
