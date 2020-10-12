import React from 'react'
import stylesCss from './modal.module.css'

export default function Modal({ width, height, children }){
    
    const stylesProps = {
        width,
        height
    }

    return (
        <div className={stylesCss.modal}>
            <div style={stylesProps}>
                {children}
            </div>
        </div>
    )
}
