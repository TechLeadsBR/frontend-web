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
        onClick(event)
    }

    return (
        <button
            style={{...stylesCss, ...styleProps}}
            onClick={(event) => onclick(event)}    
        >{text}</button>
    )
}