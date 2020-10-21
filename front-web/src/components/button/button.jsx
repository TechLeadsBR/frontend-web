import React from 'react'
import stylesCss from './button.module.css'

export default function Button({ text, bgColor, textColor, onClick, customStyles}){
    
    const styleProps = {
        ...customStyles,
        backgroundColor: bgColor,
        color: textColor
    }

    const onclick = (event) => {
        event.preventDefault()
        if(onClick) onClick(event)
    }

    return (
        <button
            className={stylesCss}
            style={styleProps}
            onClick={(event) => onclick(event)}    
        >{text}</button>
    )
}