import React from 'react'
import stylesCss from './filmFrame.module.css'

function FilmFrame({ 
        styleProps: { 
            bgColorRgba, 
            width, 
            height 
        }, 
        srcImg, 
        children 
}){
    
    const stylePropsLeftAndFrame = {
        'backgroundImage': `linear-gradient(rgba(${bgColorRgba}), rgba(${bgColorRgba})), url(${srcImg})`,
        'width': width ? width : "100%",
        'height': height
    }

    return (
        <div className={stylesCss.root} style={stylePropsLeftAndFrame}>
            {children}
        </div>
    )
}

export default React.memo(FilmFrame)