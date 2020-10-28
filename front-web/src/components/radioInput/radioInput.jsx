import React from 'react'
import stylesCss from './radioInput.module.css'

export default function RadioInput({ title, valuesArray, callbackChangedValue, name }) {

    if (!valuesArray) valuesArray = []
    if (!name) name = "defaultName"

    /**
     * valuesArray: textLabel, value
     */
    return (
        <div className={stylesCss.root}>
            <span>{title}</span>
            <div>
                {valuesArray.map((value, index) => {
                    return (
                        <div className={stylesCss.optionRadioInput} key={index}>
                            <label htmlFor={name}>{value.textLabel}</label>
                            <input
                                value={value.value}
                                type="radio"
                                name={name}
                                id={value.name}
                                onChange={event => {
                                    if (callbackChangedValue) callbackChangedValue(event.target.value)
                                }}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}