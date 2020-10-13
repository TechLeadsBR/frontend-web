import React, { useEffect } from 'react'
import stylesCss from './login.module.css'
import Input from './../../components/input/input'
import Button from './../../components/button/button'
import Header from './../../components/header/header'
import Footer from './../../components/footer/footer'
import Modal from './../../components/modal/modal'
import logoVermelha from './../../assets/images/logos/logo-vermelha.png'
import { Colors } from '../../services/constants'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Login(){

    const [login, setLogin] = useState({ email: null, password: null })

    const loginFunction = () => {
        console.log('Enviou!')
        console.log('Agora vai fazer isso aqui')
    }

    useEffect(() => {
        console.log('Alterou')
        console.log(login)
    }, [login])

    const childModal = (
        <div className={stylesCss.childModal}>
            <img src={logoVermelha} alt={"Logo Talentos SENAI"} />
            <b>Acesse sua conta</b>
            <form>
                <Input 
                    labelText={"E-mail"}
                    type={"email"}
                    onChange={(event) => setLogin({...login, email: event.target.value})}
                />
                <Input 
                    labelText={"Senha"}
                    type={"password"}
                    onChange={(event) => setLogin({...login, password: event.target.value})}
                />
                <Button 
                    bgColor={Colors.red.hexadecimal}
                    text={"Entrar"}
                    textColor={Colors.white.hexadecimal}
                    onClick={() => loginFunction()}
                />
            </form>
            <div className={stylesCss.hasNoRegistration}>
                <p>Não tem cadastro?</p><Link to="/">Registre-se</Link>
            </div>
        </div>
    )

    return (
        <div>
            <Header />
            <div className={stylesCss.root}>
                <Modal>{childModal}</Modal>
            </div>
            <Footer />
        </div>
    )
}