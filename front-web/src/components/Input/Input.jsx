import React from 'react'
import './Input.css'

export default function Input({ placeHolder, alt, type, onChange, labelText, styles}){

    return (
        <div className={"root"}>
            <label>{labelText}</label>
            <input 
                style={styles}
                placeholder={placeHolder} 
                alt={alt} 
                type={type} 
                onChange={onChange} 
            />
        </div>
    )
}