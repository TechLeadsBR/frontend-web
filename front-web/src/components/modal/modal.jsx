import React from 'react'
import stylesCss from './modal.module.css'

export default function Modal({ styleProps: { width, height }=false, children, fixed=false }){

    return (
        <div className={stylesCss.modal} 
            style={{ position: fixed ? "fixed" : null }}>
            <div style={{width, height}}>
                {children}
            </div>
        </div>
    )
}
