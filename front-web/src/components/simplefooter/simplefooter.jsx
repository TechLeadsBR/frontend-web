import React from 'react'
import stylesCss from './simplefooter.module.css'

export default function SimpleFooter(){

    return (
        <footer className={stylesCss.root}>
            <div>
                <p>Copyright 2020 © Todos os direitos reservados.</p>
            </div>  
        </footer>
    )
}