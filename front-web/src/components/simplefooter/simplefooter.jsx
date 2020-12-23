import React, { memo } from 'react'
import stylesCss from './simplefooter.module.css'

function SimpleFooter(){

    return (
        <footer className={stylesCss.root}>
            <div>
                <p>Copyright 2020 © Todos os direitos reservados.</p>
            </div>  
        </footer>
    )
}

export default memo(SimpleFooter)
