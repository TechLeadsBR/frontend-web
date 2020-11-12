import React, { useEffect, useState } from 'react'
import stylesCss from './inicioCadastro.module.css'
import Header from './../../components/header/header'
import Footer from './../../components/footer/footer'
import Input from './../../components/input/input'
import Button from './../../components/button/button'
import ReactToast from './../../components/reactToast/reactToast'
import FilmFrame from './../../components/filmFrame/filmFrame'
import { useParams, useHistory } from 'react-router-dom'
import { Colors } from '../../services/constants/constants'
import { saveInSessionStorage } from './../../services/functions'
import { messageToast } from './../../services/functions'

import logoVermelha from './../../assets/images/logos/logo-vermelha-talentos-senai.png'
import imgAmbienteDeTrabalho from './../../assets/images/universal/ambiente-de-trabalho-4.jpg'
import imgAmbienteDeTrabalhoCompanyRender from './../../assets/images/universal/ambiente-de-trabalho-5.jpg'

export default function InicioCadastro() {

    const history = useHistory()
    const { user } = useParams()
    const [data, setData] = useState(null)

    useEffect(() => {
        if (user !== "aluno" && user !== "empresa") history.push("/")
    }, [history, user])

    const validateAndRedirect = (labelInput, redirectPage) => {
        if (labelInput === "CPF") {
            if (!data || data.length < 11 || data.length > 11) {
                return messageToast("Preencha os dados corretamente", "error")
            }
        } else if (labelInput === "CNPJ") {
            if (!data || data.length < 14 || data.length > 14) {
                return messageToast("Preencha os dados corretamente", "error")
            }
        }
        saveInSessionStorage(labelInput, data)
        history.push(redirectPage)
    }

    const registrationForm = () => {
        const labelInput = user === "aluno" ? "CPF" : "CNPJ"
        const nameInput = user === "aluno" ? "cpfInput" : "cnpjInput"
        const bgColorButton = user === "aluno" ? "red" : "black"
        const redirectPage = user === "aluno" ? "/cadastro-aluno" : "/cadastro-empresa"

        return (
            <div className={stylesCss.registrationForm}>
                <div>
                    <img src={logoVermelha} alt={"Logo vermelho Talentos SENAI"} />
                    <form>
                        <Input
                            type={"number"}
                            labelText={labelInput}
                            name={nameInput}
                            onChange={(event) => setData(event.target.value)}
                        />
                        <Button
                            bgColor={bgColorButton}
                            text={"Prosseguir"}
                            onClick={() => validateAndRedirect(labelInput, redirectPage)}
                        />
                    </form>
                </div>
            </div>
        )
    }

    const generateContentChildFilmFrame = (title) => {
        return (
            <div className={stylesCss.childFilmFrame}>
                <span></span>
                <h2>{title}</h2>
                <span></span>
                <h2>Cadastre-se!</h2>
            </div>
        )
    }

    const childFilmFrameStudent = generateContentChildFilmFrame("Encontre novos desafios")
    const childFilmFrameCompany = generateContentChildFilmFrame("Encontre seu talento")

    // decisions
    const imgFilmFrame = user === "aluno" ? imgAmbienteDeTrabalho : imgAmbienteDeTrabalhoCompanyRender
    const rgbaFilmFrame = user === "aluno" ? Colors.red.rgb + ", 0.6" : Colors.matteBlack.rgb + ", 0.6"
    const childFilmFrame = user === "aluno" ? childFilmFrameStudent : childFilmFrameCompany

    return (
        <div>
            <Header />
            <div className={stylesCss.contentPage}>
                <FilmFrame
                    srcImg={imgFilmFrame}
                    styleProps={{ width: "45%", height: "75vh", bgColorRgba: rgbaFilmFrame }}
                >
                    {childFilmFrame}
                </FilmFrame>
                {registrationForm()}
            </div>
            <Footer />
            <ReactToast />
        </div>
    )
}
