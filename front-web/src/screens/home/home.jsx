import React, { useState } from 'react'
import stylesCss from './home.module.css'
import Header from './../../components/header/header'
import FilmFrame from '../../components/filmFrame/filmFrame'
import Footer from './../../components/footer/footer'
import CardTechnologiesHome from '../../components/cardTechnologiesHome/cardTechnologiesHome'
import { Colors } from '../../services/constants/constants'
import { Images } from './../../assets/images'

import studentStylesCss from './homeStudent.module.css'
import companyStylesCss from './homeCompany.module.css'

//#region Student constants
const partnerCompaniesArray = [
    {
        name: "Logo BRQ Digital Solutions",
        srcImg: Images.imgLogoBrq,
        width: 120
    },
    {
        name: 'Logo Space Needle Tecnologia',
        srcImg: Images.imgLogoSpaceNeedle,
        width: 200
    },
    {
        name: 'Logo Intelitrader',
        srcImg: Images.imgLogoInteliTrader,
        width: 170
    }
]

const advantageOurPlatformArray = [
    "Conheça seu perfil comportamental",
    "Encontre novos desafios profissionais",
    "Contato direto com as empresas",
    "Gerenciamento das candidaturas"
]
//#endregion

//#region Company constants
const technologies = [
    { text: "Desenvolvimento Full-Stack", color: "198, 170, 58, 0.5", image: Images.imgFullStack },
    { text: "Desenvolvimento Back-end", color: "63, 147, 70, 0.5", image: Images.imgBackEnd },
    { text: "Desenvolvimento Front-end", color: "102, 53, 110, 0.5", image: Images.imgFrontEnd },
    { text: "Desenvolvimento Design Ux", color: "33, 94, 205, 0.5", image: Images.imgDesignUx },
]
//#endregion

export default function Home() {

    const [typeRender, setTypeRender] = useState("student")

    //#region Student elements
    const childFilmFrame = (
        <div className={studentStylesCss.childFilmFrame}>
            <div></div>
            <h1>Sua carreira profissional<br />começa aqui!</h1>
            <div></div>
        </div>
    )

    const partnerCompaniesChild = (
        <div className={studentStylesCss.partnerCompanies}>
            <h2>Algumas das empresas parceiras</h2>
            <div>
                {partnerCompaniesArray.map((company, index) => <img src={company.srcImg} alt={company.name} key={index} width={company.width} />)}
            </div>
        </div>
    )

    const advantageOurPlatform = (
        <div className={studentStylesCss.rootAdvantageOurPlatform}>
            <h2>Nossas vantagens</h2>
            <div className={studentStylesCss.advantageOurPlatform}>
                <img
                    src={Images.imgNotebookWithLogo}
                    alt={"Notebook com logo Talentos SENAI"}
                />
                <div className={studentStylesCss.advantagesItens}>
                    {advantageOurPlatformArray.map((advantage, index) => {
                        return (
                            <div className={studentStylesCss.advantageItem} key={index}>
                                <div>{index + 1}</div>
                                <p>{advantage}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
    //#endregion

    //#region Company elements
    const cardTechnologies = (
        <div className={companyStylesCss.cardTechnologies}>
            <h2>Encontre talentos para...</h2>
            <div>
                <div className={companyStylesCss.rowCards}>
                    {technologies.slice(0, 2).map((t, i) =>
                        <CardTechnologiesHome key={i} colorRgba={t.color} image={t.image} text={t.text} />)}
                </div>
                <div className={companyStylesCss.rowCards}>
                    {technologies.slice(2, 4).map((t, i) =>
                        <CardTechnologiesHome key={i} colorRgba={t.color} image={t.image} text={t.text} />)}
                </div>
            </div>
        </div>
    )

    const greyBackground = (
        <div className={companyStylesCss.greyBackground}>
            <h2>Como Funciona</h2>
            <span>Anuncie sua vaga e contrate os verdadeiros talentos.</span>
            <div>
                <div className={companyStylesCss.cardGreyBackground}>
                    <img src={Images.imgCurriculoIcon} alt={"Icone curriculo"} />
                    <span>Publique vagas</span>
                    <p>Publíque aqui as vagas disponiveis<br />em sua empresa para os nossos<br /> jovens talentos.</p>
                </div>
                <div className={companyStylesCss.cardGreyBackground}>
                    <img src={Images.imgGroupIcon} alt={"Icone grupo"} />
                    <span>Recrute Talentos</span>
                    <p>Aqui você encontrara os<br />melhores alunos da nossa<br />instituição Senai</p>
                </div>
            </div>
        </div>
    )
    //#endregion

    // decisions
    const backgroundFilmFrame = typeRender === "student" ? Colors.red.rgb + ", 0.6" : Colors.matteBlack.rgb + ", 0.6"
    const firstContent = typeRender === "student" ? partnerCompaniesChild : cardTechnologies
    const secondContent = typeRender === "student" ? advantageOurPlatform : greyBackground
    const srcImageFilmFrame = typeRender === "student" ? Images.imgAmbienteTrabalho : Images.imgAmbienteTrabalhoCompanyRender

    return (
        <div>
            <Header
                typeHeader={"home"}
                callback={(type) => setTypeRender(type)}
            />
            <div className={stylesCss.divFilmFrame}>
                <FilmFrame
                    styleProps={{ bgColorRgba: backgroundFilmFrame, type: "full" }}
                    srcImg={srcImageFilmFrame}
                >
                    {childFilmFrame}
                </FilmFrame>
            </div>
            {firstContent}
            {secondContent}
            <Footer />
        </div>
    )
}