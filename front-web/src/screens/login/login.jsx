import React, { useEffect, useState } from 'react'
import stylesCss from './login.module.css'
import Input from './../../components/input/input'
import Button from './../../components/button/button'
import Header from './../../components/header/header'
import Footer from './../../components/footer/footer'
import Modal from './../../components/modal/modal'
import LoadingPage from './../../components/loadingPage/loadingPage'
import { functionAfterTime } from './../../services/functions'
import logoVermelha from './../../assets/images/logos/logo-vermelha.png'
import { Colors } from '../../services/constants/constants'
import { Link, useParams, useHistory } from 'react-router-dom'
import { requestAPI } from './../../services/api'

export default function Login() {

    const history = useHistory()
    const { administrator } = useParams()
    const [login, setLogin] = useState({ email: null, password: null })
    const [showLoadingIcon, setShowLoadingIcon] = useState(true)
    
    useEffect(() => {
        if(administrator !== undefined && administrator !== "administrator") history.push("/")
    })

    const isAdministrator = administrator === "administrator"

    const requestApiLogin = async () => {
        await requestAPI("/login")
        
    }

    const childModalFormLogin = (
        <div className={stylesCss.childModalFormLogin}>
            <img src={logoVermelha} alt={"Logo Talentos SENAI"} />
            <b>Acesse sua conta</b>
            <form>
                <Input
                    labelText={"E-mail"}
                    type={"email"}
                    onChange={(event) => setLogin({ ...login, email: event.target.value })}
                />
                <Input
                    labelText={"Senha"}
                    type={"password"}
                    onChange={(event) => setLogin({ ...login, password: event.target.value })}
                />
                <Button
                    bgColor={Colors.red.hexadecimal}
                    text={"Entrar"}
                    textColor={Colors.white.hexadecimal}
                    onClick={() => requestApiLogin()}
                />
            </form>
            <div className={stylesCss.hasNoRegistration}>
                <p>Não tem cadastro?</p><Link to="/">Registre-se</Link>
            </div>
        </div>
    )

    return (
        <div onLoad={() => functionAfterTime(1600, () => setShowLoadingIcon(!showLoadingIcon))}>
            {showLoadingIcon && <LoadingPage />}
            <Header />
            <div className={stylesCss.root} id={isAdministrator ? stylesCss.administrator : null}>
                <Modal>
                    {childModalFormLogin}
                </Modal>
            </div>
            <Footer />
        </div>
    )
}