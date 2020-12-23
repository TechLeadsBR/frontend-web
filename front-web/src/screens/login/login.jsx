import React, { useEffect, useState, useCallback, useMemo } from 'react'
import stylesCss from './login.module.css'
import Input from './../../components/input/input'
import Button from './../../components/button/button'
import Header from './../../components/header/header'
import Footer from './../../components/footer/footer'
import Modal from './../../components/modal/modal'
import ReactToast from './../../components/reactToast/reactToast'
import LoadingPage from './../../components/loadingPage/loadingPage'
import { functionAfterTime, saveTokenInLocalStorage, messageToast } from './../../services/functions'
import { Link, useParams, useHistory } from 'react-router-dom'
import { loginActions } from './../../actions'
import { Images } from './../../assets/images'

function Login() {

    const history = useHistory()
    const { user } = useParams()
    const [login, setLogin] = useState({ email: null, senha: null })
    const [showLoadingIcon, setShowLoadingIcon] = useState(true)

    const verifyUser = useCallback(() => {
        if (user !== undefined
            && user !== "administrador"
            && user !== "aluno"
            && user !== "empresa"
        ) history.push("/")
    }, [history, user])

    useEffect(() => {
        verifyUser()
    }, [verifyUser])

    const titleModal = useMemo(() => {
        if (user === "aluno") return "Acesse sua conta como Aluno"
        if (user === "empresa") return "Acesse sua conta como Empresa"
        if (user === "administrador") return "Acesse sua conta como Administrador"
    }, [user])

    const requestApiLogin = async () => {
        loginActions.loginUser(user, login)
            .then(request => {
                messageToast("Login realizado com sucesso!", "success")
                saveTokenInLocalStorage(request.data.message)
                const pushUser = user === "aluno" ? "/perfil-aluno" : user === "empresa" ? "/perfil-empresa" : "/inicial-administrador"
                functionAfterTime(5000, () => history.push(pushUser))
            })
            .catch(() => messageToast("Usuario não encontrado!", "error"))
    }

    const childModalFormLogin = (
        <div className={stylesCss.childModalFormLogin}>
            <img src={Images.logoVermelha} alt={"Logo Talentos SENAI"} />
            <b>{titleModal}</b>
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
                    text={"Entrar"}
                    onClick={() => requestApiLogin()}
                />
            </form>
            <div className={stylesCss.hasNoRegistration}>
                {user !== "administrador" && <><p>Não tem cadastro?</p><Link to={user === "aluno" ? 
                "/inicio-cadastro/aluno" : "/inicio-cadastro/empresa"}>Registre-se</Link></>}
            </div>
        </div>
    )

    const setIdToBackground = useMemo(() => {
        if (user === "administrador") return stylesCss.administrator
        if (user === "aluno") return stylesCss.student
        if (user === "empresa") return stylesCss.company
    }, [user])

    return (
        <div onLoad={() => functionAfterTime(1600, () => setShowLoadingIcon(false))}>
            <LoadingPage visible={showLoadingIcon} />
            <Header />
            <div className={stylesCss.root} id={setIdToBackground}>
                <Modal>
                    {childModalFormLogin}
                </Modal>
            </div>
            <Footer />
            <ReactToast />
        </div>
    )
}


export default React.memo(Login)