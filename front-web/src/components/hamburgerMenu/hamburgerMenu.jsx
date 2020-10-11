import React from 'react'
import stylesCss from './hamburgerMenu.module.css'
import iconUser from './../../assets/images/icons/user.png'

export default function HamburgerMenu(){
    return (
        <div className={stylesCss.hambugerMenuUserLogged}>
            <img src={iconUser} alt={"Icone representando um usuario"} />
        </div>
    )
}