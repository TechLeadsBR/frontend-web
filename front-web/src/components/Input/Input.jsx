import React from 'react'
import './Input.css'

export default function Input(props){
    const { placeHolder, alt, type, onClick, onChange, labelText } = props

    return (
        <div className={"root"}>
            <label>{labelText}</label>
            <input placeholder={placeHolder} alt={alt} type={type} onClick={onClick} onChange={onChange} />
        </div>
    )
}