import React, { useState } from 'react'
import stylesCss from './textAreaInput.module.css'

export default function TextInput({
    name,
    callbackChangedValue,
    labelText
}) {

    const [maxLength, setMaxLength] = useState(100)
    const [currentValueInput, setCurrentValeuInput] = useState(0)

    const counterValueInput = (value) => {
        // Na mudança do input nos passamos a quantidade de caracteres para o currentValueInput
        setCurrentValeuInput(String(value).length)

        const lengthValue = String(value).length

        // Se o valor atual da mudança for maior que o valor atual então nós diminuimos 1 no display do maxlenght
        if (lengthValue > currentValueInput) setMaxLength(maxLength - 1)

        // Se o valor atual da mudança for menor que o valor atual então nós adicionamos 1 no display do maxlenght
        if (lengthValue < currentValueInput) setMaxLength(maxLength + 1)

        if(callbackChangedValue) callbackChangedValue(value)
    }

    return (
        <div className={stylesCss.root}>
            <div>
                <label htmlFor={name}>{labelText}</label>
                <span>{maxLength >= 0 && maxLength}</span>
            </div>
            <textarea
                rows={7}
                onChange={(event) => counterValueInput(event.target.value)}
                maxLength={100}
            />
        </div>
    )
}