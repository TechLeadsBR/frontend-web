import React from 'react'
import stylesCss from './simplefooter.module.css'

export default function SFooter(){

    return (
        <footer className={stylesCss.root}>
            <div className={stylesCss.rootCopy}>
                <p>Copyright 2020 © Todos os direitos reservados.</p>
            </div>  
        </footer>
    )
}