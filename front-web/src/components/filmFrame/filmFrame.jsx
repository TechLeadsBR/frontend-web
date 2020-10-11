import React from 'react'
import stylesCss from './filmFrame.module.css'

export default function FilmFrame({ 
        styleProps: { 
            bgColorRgba, 
            width, 
            height 
        }, 
        srcImg, 
        children, 
        type="left" 
}){
    
    const stylePropsTypeLeft = {
        'background-image': `linear-gradient(rgba(${bgColorRgba}), rgba(${bgColorRgba})), url(${srcImg})`,
        'width': width,
        'height': height
    }

    const stylePropsTypeFrame = {}

    const styleProps = type === "left" ? stylePropsTypeLeft : stylePropsTypeFrame

    return (
        <div className={stylesCss.root} style={styleProps}>
            {children}
        </div>
    )
}