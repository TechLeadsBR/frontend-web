import React from 'react'
import stylesCss from './modal.module.css'

export default function Modal({ width, height, children, fixed=false }){
    
    const stylesProps = {
        width,
        height
    }

    return (
        <div className={stylesCss.modal} 
            style={{ position: fixed ? "fixed" : null }}>
            <div style={stylesProps}>
                {children}
            </div>
        </div>
    )
}
