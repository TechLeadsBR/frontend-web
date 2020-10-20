import React, { useState } from 'react'
import stylesCss from './menuIconHeader.module.css'
import iconUser from './../../assets/images/icons/user.png'
import { Link } from 'react-router-dom'

export default function MenuIconHeader({ typeUser }) {

    const [stateNavigationLinksList, setStateNavigationLinksList] = useState(false)

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

    const navigationLinksList = (
        <div className={stylesCss.rootNavigationLinksList}>
            <ul>
                <li onClick={() => setStateNavigationLinksList(!stateNavigationLinksList)}>X</li>
                {listLinks()}
            </ul>
        </div>
    )

    return (
        <div
            className={stylesCss.menuIconHeader}
            onClick={() => setStateNavigationLinksList(!stateNavigationLinksList)}
        >
            <nav>
                {stateNavigationLinksList ? navigationLinksList : 
                <img
                    src={iconUser}
                    alt={"Icone representando um usuario"}
                 />}
            </nav>
        </div>
    )
}
