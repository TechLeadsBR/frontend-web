import React from 'react'
import stylesCss from './button.module.css'

export default function Button({ text, bgColor="red", onClick}){

    const onclick = (event) => {
        event.preventDefault()
        if(onClick) onClick(event)
    }

    return (
        <button
            className={stylesCss.button + " " + stylesCss[bgColor]}
            onClick={(event) => onclick(event)}    
        >{text}</button>
    )
}