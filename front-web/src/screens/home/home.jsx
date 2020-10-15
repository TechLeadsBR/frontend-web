import React, { useState, useEffect } from 'react'
import stylesCss from './home.module.css'
import Header from './../../components/header/header'
import FilmFrame from '../../components/filmFrame/filmFrame'
import ambienteTrabalho from './../../assets/images/universal/ambiente-de-trabalho-1.png'
import ambienteTrabalhoCompanyRender from './../../assets/images/universal/ambiente-de-trabalho-produtividade.jpg'
import Footer from './../../components/footer/footer'
import { Colors } from './../../services/constants'
import logoBrq from './../../assets/images/partnerCompanies/logo-brq-digital-solutions.png'
import logoSpaceNeedle from './../../assets/images/partnerCompanies/logo-space-needle.png'
import logoInteliTrader from './../../assets/images/partnerCompanies/logo-inteli-trader.png'
import notebookWithLogo from './../../assets/images/universal/notebook-with-talentos-logo.png'

export default function Home() {

    const [typeRender, setTypeRender] = useState("student")

    const partnerCompaniesArray = [
        {
            name: "Logo BRQ Digital Solutions",
            srcImg: logoBrq,
            width: 120
        },
        {
            name: 'Logo Space Needle Tecnologia',
            srcImg: logoSpaceNeedle,
            width: 200
        },
        {
            name: 'Logo Intelitrader',
            srcImg: logoInteliTrader,
            width: 170
        }
    ]

    const advantageOurPlatformArray = [
        "Conheça seu perfil comportamental",
        "Encontre novos desafios profissionais",
        "Contato direto com as empresas",
        "Gerenciamento das candidaturas"
    ]

    useEffect(() => {
        console.log('Alterou')
        console.log(typeRender)
    }, [typeRender])

    const childFilmFrame = (
        <div className={stylesCss.childFilmFrame}>
            <div></div>
            <h1>Sua carreira profissional<br />começa aqui!</h1>
            <div></div>
        </div>
    )

    const partnerCompaniesChild = (
        <div className={stylesCss.partnerCompanies}>
            <h2>Algumas das empresas parceiras</h2>
            <div>
                {partnerCompaniesArray.map((company, index) => <img src={company.srcImg} alt={company.name} key={index} width={company.width} />)}
            </div>
        </div>
    )

    const advantageOurPlatform = (
        <div className={stylesCss.rootAdvantageOurPlatform}>
            <h2>Nossas vantagens</h2>
            <div className={stylesCss.advantageOurPlatform}>
                <img
                    src={notebookWithLogo}
                    alt={"Notebook com logo Talentos SENAI"}
                />
                <div className={stylesCss.advantagesItens}>
                    {advantageOurPlatformArray.map((advantage, index) => {
                        return (
                            <div className={stylesCss.advantageItem} key={index}>
                                <div>{index + 1}</div>
                                <p>{advantage}</p>
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    )

    const backgroundFilmFrame = typeRender === "student" ? Colors.red.rgb + ", 0.6" : Colors.matteBlack.rgb + ", 0.6"

    return (
        <div>
            <Header
                home={true}
                callback={(type) => setTypeRender(type)}
            />
            <div className={stylesCss.divFilmFrame}>
                <FilmFrame
                    styleProps={{ bgColorRgba: backgroundFilmFrame, height: "55vh", width: "100%" }}
                    srcImg={typeRender === "student" ? ambienteTrabalho : ambienteTrabalhoCompanyRender}
                >
                    {childFilmFrame}
                </FilmFrame>
            </div>
            {partnerCompaniesChild}
            {advantageOurPlatform}
            <Footer />
        </div>
    )
}