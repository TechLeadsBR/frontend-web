import React from 'react'
import stylesCss from './input.module.css'

export default function Input({ placeHolder, alt, type, onChange, labelText, customStyles, name}){

    return (
        <div className={stylesCss.root}>
            <label htmlFor={name}>{labelText}</label>
            <input 
                id={name}
                style={customStyles}
                placeholder={placeHolder} 
                alt={alt} 
                type={type} 
                onChange={onChange} 
            />
        </div>
    )
}