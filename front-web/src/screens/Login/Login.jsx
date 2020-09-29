import React, { useState } from 'react'
import Input from '../../components/Input/Input'
import { requestApi } from './../../util/api'
import Button from '../../components/Button/Button'

export default function Login(){

    const [user, setUser] = useState({email: null, senha: null})

    const requestApiLogin = (event) => {
        event.preventDefault()
        console.log("event")
    }

    return (
        <div>
            <form onSubmit={(event) => requestApiLogin(event)}>
                <Input 
                    type={"text"}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    labelText={"Email"}
                />
                <Input
                    type={"password"}
                    labelText={"Senha"}
                    onChange={(e) => setUser({...user, senha: e.target.value})}
                />
                <Button 
                    text={"Entrar"}
                    bgColor={"green"}
                    colorText={"white"}
                />
            </form>
        </div>
    )
}