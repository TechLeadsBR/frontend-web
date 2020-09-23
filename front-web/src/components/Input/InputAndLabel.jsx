import React from 'react'
import './InputAndLabel.css'

export default function InputAndLabel(props){
    const { placeHolder, alt, type, onClick, onChange, labelText } = props

    return (
        <div className={"root"}>
            <label>{labelText}</label>
            <input placeholder={placeHolder} alt={alt} type={type} onClick={onClick} onChange={onChange} />
        </div>
    )
}