import React from 'react'
import './Button.css'

export default function Button({ text, bgColor, colorText, onClick, styles}){
    
    const style = {
        ...styles,
        backgroundColor: bgColor,
        color: colorText
    }

    return (
        <button
            style={style}
            onClick={onClick}    
        >{text}</button>
    )
}