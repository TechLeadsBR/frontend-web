import React, { useState, useMemo } from 'react'
import stylesCss from './menuIconHeader.module.css'
import { Link } from 'react-router-dom'
import { Images } from './../../assets/images'

export default function MenuIconHeader({ typeHeader }) {

    const [stateNavigationLinksList, setStateNavigationLinksList] = useState(false)

    const listLinks = useMemo(() => {
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
    }, [typeHeader])

    const navigationLinksList = useMemo(() => {
        return (
            <div className={stylesCss.rootNavigationLinksList}>
                <ul>
                    <li onClick={() => setStateNavigationLinksList(!stateNavigationLinksList)}>X</li>
                    {listLinks}
                </ul>
            </div>
        )
    }, [listLinks, stateNavigationLinksList])

    return (
        <div
            className={stylesCss.menuIconHeader}
            onClick={() => setStateNavigationLinksList(!stateNavigationLinksList)}
        >
            <nav>
                {stateNavigationLinksList && navigationLinksList}
                <img
                    src={Images.iconUser}
                    alt={"Icone representando um usuario"}
                />
            </nav>
        </div>
    )
}
