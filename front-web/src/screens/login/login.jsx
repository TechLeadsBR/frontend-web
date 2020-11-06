import React, { useEffect, useState } from 'react'
import stylesCss from './login.module.css'
import Input from './../../components/input/input'
import Button from './../../components/button/button'
import Header from './../../components/header/header'
import Footer from './../../components/footer/footer'
import Modal from './../../components/modal/modal'
import ReactToast from './../../components/reactToast/reactToast'
import logoVermelha from './../../assets/images/logos/logo-vermelha-talentos-senai.png'
import LoadingPage from './../../components/loadingPage/loadingPage'
import { functionAfterTime, saveTokenInLocalStorage } from './../../services/functions'
import { Colors } from '../../services/constants/constants'
import { Link, useParams, useHistory } from 'react-router-dom'
import { requestAPI } from './../../services/api'

export default function Login() {

    const history = useHistory()
    const { user } = useParams()
    const [login, setLogin] = useState({ email: null, senha: null })
    const [showLoadingIcon, setShowLoadingIcon] = useState(true)
    const [toastProps, setToastProps] = useState({ text: null, visible: false, status: null })

    useEffect(() => {
        if (user !== undefined
            && user !== "administrador"
            && user !== "aluno"
            && user !== "empresa"
        ) history.push("/")
    })

    const toastFunction = (text, status="error") => {
        setToastProps({ visible: true, text, status })
        functionAfterTime(3000, () => setToastProps({ visible: false, text: null, status: null }))
    }

    const titleModal = () => {
        if (user === "aluno") return "Acesse sua conta como Aluno"
        if (user === "empresa") return "Acesse sua conta como Empresa"
        if (user === "administrador") return "Acesse sua conta como Administrador"
    }

    const requestApiLogin = async () => {
        try {
            const request = await requestAPI("post", `/login/${user}`, login)

            if (request.status === 200) {
                toastFunction("Login realizando com sucesso!", "success")
                saveTokenInLocalStorage(request.data.message)

                const pushUser = user === "aluno" ? "/perfil-aluno" : user === "empresa" ? "/perfil-empresa" : "/inicial-administrador"
                functionAfterTime(1000, () => history.push(pushUser))
            }
        } catch (error) {
            toastFunction("Usuario não encontrado!", "error")
        }
    }

    const childModalFormLogin = (
        <div className={stylesCss.childModalFormLogin}>
            <img src={logoVermelha} alt={"Logo Talentos SENAI"} />
            <b>{titleModal()}</b>
            <form>
                <Input
                    labelText={"E-mail"}
                    type={"email"}
                    onChange={(event) => setLogin({ ...login, email: event.target.value })}
                />
                <Input
                    labelText={"Senha"}
                    type={"password"}
                    onChange={(event) => setLogin({ ...login, senha: event.target.value })}
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

    const setIdToBackground = () => {
        if (user === "administrador") return stylesCss.administrator
        if (user === "aluno") return stylesCss.student
        if (user === "empresa") return stylesCss.company
    }

    return (
        <div onLoad={() => functionAfterTime(1600, () => setShowLoadingIcon(false))}>
            <LoadingPage visible={showLoadingIcon} />
            <Header />
            <div className={stylesCss.root} id={setIdToBackground()}>
                <Modal>
                    {childModalFormLogin}
                </Modal>
            </div>
            <Footer />
            <ReactToast 
                textToast={toastProps.text}
                status={toastProps.status}
                visible={toastProps.visible}
            />
        </div>
    )
}
