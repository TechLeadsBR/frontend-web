import React from 'react'
import stylesCss from './input.module.css'

export default function CInput({  
    type, 
    onChange, 
    labelText, 
    customStyles, 
    name,
    currentValue
}){

    return (
        <div className={stylesCss.root}>
            <label htmlFor={name}>{labelText}</label>
            <input
                id={name}
                style={customStyles}
                type={type}
                onChange={event => onChange ? onChange(event) : () => ""}
                value={currentValue}
            />
        </div>
    )
}
