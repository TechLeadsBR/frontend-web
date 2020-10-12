import React from 'react'
import stylesCss from './filmFrame.module.css'

export default function FilmFrame({ 
        styleProps: { 
            bgColorRgba, 
            width, 
            height 
        }, 
        srcImg, 
        children 
}){
    
    const stylePropsLeftAndFrame = {
        'background-image': `linear-gradient(rgba(${bgColorRgba}), rgba(${bgColorRgba})), url(${srcImg})`,
        'width': width ? width : "100%",
        'height': height
    }

    return (
        <div className={stylesCss.root} style={stylePropsLeftAndFrame}>
            {children}
        </div>
    )
}