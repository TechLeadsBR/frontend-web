import React from 'react'
import InputAndLabel from '../../components/Input/InputAndLabel'

export default function Login(){
    return (
        <div>
            Login
            <InputAndLabel 
                type={"text"}
                onChange={(e) => console.log(e.target.value)}
                labelText={"Email"}
            />
            <InputAndLabel
                type={"password"}
                labelText={"Senha"}
                onChange={(e) => console.log(e.target.value)}
            />
        </div>
    )
}