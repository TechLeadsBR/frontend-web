import React from 'react'
import stylesCss from './cardJob.module.css'

export default function CardJob({ 
    job: { 
        srcImgCompany,
        nameCompany,
        local,
        level,
        description,
        title,
        idVagaEmprego
    },
    callbackJobInformation
}){

    const callback = () => {
        if(callbackJobInformation){
            callbackJobInformation({
                srcImgCompany, nameCompany, local, level, description, title, idVagaEmprego
            })
        }
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