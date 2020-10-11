import React, { useState } from 'react'
import stylesCss from './hamburgerMenu.module.css'
import iconUser from './../../assets/images/icons/user.png'

export default function HamburgerMenu({ links }){

    const [stateScreenWithLinks, setStateScreenWithLinks] = useState(false)

    const screenFullWidthWithLinks = (
        <div className={stylesCss.screenWithLinks}>{links}</div>
    )

    return (
        <div 
            className={stylesCss.hambugerMenuUserLogged}
            onClick={() => setStateScreenWithLinks(true)}
            >
            <img src={iconUser} alt={"Icone representando um usuario"} />
            {stateScreenWithLinks ? screenFullWidthWithLinks : null}
        </div>
    )
}