import React from 'react'
import stylesCss from './cardTechnologiesHome.module.css'

export default function CardTechnologiesHome({
    colorRgba,
    image,
    text
}){

    const styleProps = {
        'backgroundImage': `linear-gradient(rgba(${colorRgba}), rgba(${colorRgba})), url(${image})`,
    }

    return (
        <div className={stylesCss.root} style={styleProps}>
            <span>{text}</span>
        </div>
    )
}