import React, { memo } from 'react'
import stylesCss from './filmFrame.module.css'

function FilmFrame({ 
        styleProps: { 
            bgColorRgba, 
            type
        }, 
        srcImg, 
        children 
}){
    
    const stylePropsLeftAndFrame = {
        'backgroundImage': `linear-gradient(rgba(${bgColorRgba}), rgba(${bgColorRgba})), url(${srcImg})`,
    }

    return (
        <div className={`${stylesCss.root} ${stylesCss[type]}`} style={stylePropsLeftAndFrame}>
            {children}
        </div>
    )
}

export default memo(FilmFrame)