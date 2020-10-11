import React, { useState } from 'react'
import Input from './../../components/input/input'
import Button from './../../components/button/button'

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
                    name={"email"}
                />
                <Input
                    type={"password"}
                    labelText={"Senha"}
                    onChange={(e) => setUser({...user, senha: e.target.value})}
                    name={"password"}
                />
                <Button 
                    text={"Entrar"}
                    bgColor={"green"}
                    textColor={"white"}
                    onClick={() => null}
                />
            </form>
        </div>
    )
}