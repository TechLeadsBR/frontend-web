import React, { memo } from 'react'
import stylesCss from './modal.module.css'

function Modal({ styleProps: { width, height } = false, children }) {

    return (
        <div className={stylesCss.root} style={{ width, height }}>
            {children}
        </div>
    )
}

export default memo(Modal)