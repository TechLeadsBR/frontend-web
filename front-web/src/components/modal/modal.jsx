import React from 'react'
import stylesCss from './modal.module.css'

export default function Modal({ styleProps: { width, height } = false, children }) {

    return (
        <div className={stylesCss.root} style={{ width, height }}>
            {children}
        </div>
    )
}
