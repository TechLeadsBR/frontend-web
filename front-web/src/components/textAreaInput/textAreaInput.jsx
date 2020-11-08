import React, { useState } from 'react'
import stylesCss from './textAreaInput.module.css'

export default function TextAreaInput({
    name,
    callbackChangedValue,
    labelText,
    currentValue
}) {

    const [maxLength, setMaxLength] = useState(100)
    const [previusLength, setPreviusLength] = useState(0)
    const [currentLength, setCurrentValeuInput] = useState(0)

    const counterValueInput = (value) => {
        const lengthValue = String(value).length
        
        setCurrentValeuInput(c =>  c + (lengthValue - currentLength))
        setPreviusLength(p => p + (lengthValue - currentLength))
        

        console.log(lengthValue)
        console.log("curr")
    }

    return (
        <div className={stylesCss.root}>
            <div>
                <label htmlFor={name}>{labelText}</label>
                <span>{maxLength >= 0 && maxLength}</span>
            </div>
            <textarea
                value={currentValue}
                rows={7}
                onChange={(event) => {
                    counterValueInput(event.target.value)
                    callbackChangedValue(event.target.value)
                }}
                maxLength={100}
            />
        </div>
    )
}
