import React, { useState, useEffect } from 'react'
import stylesCss from './home.module.css'
import Header from './../../components/header/header'
import FilmFrame from '../../components/filmFrame/filmFrame'
import ambienteTrabalho from './../../assets/images/ambiente-de-trabalho-1.png'
import Footer from './../../components/footer/footer'
import { Colors } from './../../services/constants'
import logoBrq from './../../assets/images/partnerCompanies/logo-brq-digital-solutions.png'
import logoSpaceNeedle from './../../assets/images/partnerCompanies/logo-space-needle.png'
import logoInteliTrader from './../../assets/images/partnerCompanies/logo-inteli-trader.png'

export default function Home(){

    const [typeRender, setTypeRender] = useState("student")

    const partnerCompanies = [
        {
            name: "Logo BRQ Digital Solutions", srcImg: logoBrq,
        },
        {
            name: 'Logo Space Needle Tecnologia', srcImg: logoSpaceNeedle
        },
        {
            name: 'Logo Intelitrader', srcImg: logoInteliTrader
        }
    ]

    useEffect(() => {
        console.log('Alterou')
        console.log(typeRender)
    }, [typeRender])

    const childFilmFrame = (
        <div className={stylesCss.childFilmFrame}>
            <hr/>
            <h1>Sua carreira profissional<br/>começa aqui!</h1>
            <hr/>
        </div>
    )

    const partnerCompaniesChild = (
        <div className={stylesCss.partnerCompanies}>
            <div>
                {partnerCompanies.map((company, index) => <img src={company.srcImg} alt={company.name} key={index} />)}
            </div>
        </div>
    )

    const advantageOurPlatform = (
        <></>
    )

    return (
        <div>
            <Header 
                home={true}
                callback={(type) => setTypeRender(type)}
            />
            <FilmFrame 
                styleProps={{ bgColorRgba: Colors.red.rgb + ", 0.6", height: "30vh", width: "100%" }}
                srcImg={ambienteTrabalho}
            >
                {childFilmFrame}
            </FilmFrame>
            {partnerCompaniesChild}
            {advantageOurPlatform}
            <Footer />
        </div>
    )
}