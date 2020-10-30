import React from 'react'
import stylesCss from './select.module.css'

export default function Select({ name, options, labelText, callbackChangedValue }){

    if(!options) options = []

    return (
        <div className={stylesCss.root}>
            <label htmlFor={name}>{labelText}</label>
            <select id={name} onChange={(event) => {
                if(callbackChangedValue) callbackChangedValue(event.target.value)
            }}>
                <option defaultValue="selected">Selecione</option>
                {options.map((o, i) => <option key={i} value={o}>{o}</option>)}
            </select>
        </div>
    )
}
