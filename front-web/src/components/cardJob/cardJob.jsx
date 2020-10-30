import React from 'react'
import stylesCss from './cardJob.module.css'

export default function CardJob({ 
    job: { 
        srcImgCompany,
        nameCompany,
        local,
        level,
        description,
        title
    },
    callbackJobInformation
}){

    const callback = () => {
        callbackJobInformation({
            srcImgCompany, nameCompany, local, level, description, title
        })
    }

    return (
        <div className={stylesCss.root} onClick={() => callback()}>
            <img src={srcImgCompany} alt={`Logo empresa ${nameCompany}`}/>
            <div className={stylesCss.jobInformations}>
                <div>
                    <p>{title}</p>
                    <p>Empresa: {nameCompany}</p>
                    <p>Nível: {level}</p>
                    <p>Local: {local}</p>
                </div>
                <div></div>
                <div>
                    <p>Descrição</p>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    )
}