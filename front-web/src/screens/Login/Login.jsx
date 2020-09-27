import React from 'react'
import Input from '../../components/Input/Input'

export default function Login(){
    return (
        <div>
            Login
            <Input 
                type={"text"}
                onChange={(e) => console.log(e.target.value)}
                labelText={"Email"}
            />
            <Input
                type={"password"}
                labelText={"Senha"}
                onChange={(e) => console.log(e.target.value)}
            />
        </div>
    )
}