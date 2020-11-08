import React from 'react'
import logoBranca from './../../assets/images/logos/logo-branca-talentos-senai.png'
import stylesCss from './footer.module.css'
import facebookIcon from './../../assets/images/socialMedia/facebook.png'
import linkedinIcon from './../../assets/images/socialMedia/linkedin.png'
import youtubeIcon from './../../assets/images/socialMedia/youtube.png'
import twitterIcon from './../../assets/images/socialMedia/twitter.png'

function Footer(){

    const socialMedia = [
        { 
            icon: facebookIcon, 
            alt: "Midia social Facebook", 
            link: "https://pt-br.facebook.com/senaiinformatica/" 
        },
        { 
            icon: linkedinIcon, 
            alt: "Midia social Linkedin", 
            link: "https://www.linkedin.com/school/senaiinfo/?originalSubdomain=br"
        },
        { 
            icon: youtubeIcon, 
            alt: "Midia social YouTube", 
            link: "https://www.youtube.com/channel/UCIrKFzk1K-eOQ70NOsm587A"
        },
        { 
            icon: twitterIcon, 
            alt: "Midia social Twitter", 
            link: "https://twitter.com/senaiinfo"
        },
    ]

    return (
        <footer className={stylesCss.root}>
            <div>
                <div>
                    <img src={logoBranca} alt={'Logo branca do projeto'} />
                </div>
                <div>
                    <b>ESCOLA SENAI DE INFORMÁTICA</b>
                    <p>Al. Barão de Limeira, 539 - Santa Cecília - São Paulo/SP - CEP 01202-001</p>
                    <p>Telefone: (11) 3273-5000 |E-mail:informatica@sp.senai.br</p>
                </div>
                <nav className={stylesCss.navItens}>
                    <b>Redes sociais</b>
                    <div>
                        {socialMedia.map((media, index) => <a key={index} href={media.link}>
                            <img src={media.icon} alt={media.alt}/></a>)}
                    </div>
                </nav>
            </div>
            <div>
                <p>Copyright 2020 © Todos os direitos reservados.</p>
            </div>
        </footer>
    )
}

export default React.memo(Footer)