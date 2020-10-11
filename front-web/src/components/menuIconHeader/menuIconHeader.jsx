import React, { useState } from 'react'
import stylesCss from './menuIconHeader.module.css'
import iconUser from './../../assets/images/icons/user.png'

export default function HamburgerMenu({ links }) {

    const [stateNavigationLinksList, setStateNavigationLinksList] = useState(false)

    const navigationLinksList = (
        <div className={stylesCss.rootNavigationLinksList}>
            <ul>
                <li onClick={() => setStateNavigationLinksList(!stateNavigationLinksList)}>X</li>
                {links}
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
