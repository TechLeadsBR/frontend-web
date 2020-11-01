import React from 'react'
import stylesCss from './searchJobs.module.css'
import Input from './../../components/input/input'
import Button from './../../components/button/button'
import { Colors } from './../../services/constants/constants'
import { useState } from 'react'

export default function SearchJobs({ callbackValue }){

    const [valueInput, setValueInput] = useState("")

    return (
        <div className={stylesCss.root}>
            <div>
                <b>Busque oportunidades</b>
                <Input 
                    type={"text"}
                    currentValue={valueInput}
                    onChange={(event) => setValueInput(event.target.value)}
                />
                <Button 
                    bgColor={Colors.red.hexadecimal}
                    textColor={Colors.white.hexadecimal}
                    text={"Buscar"}
                    onClick={() => {
                        if(callbackValue) callbackValue(valueInput)
                        setValueInput("")
                    }}
                />
            </div>
        </div>
    )
}