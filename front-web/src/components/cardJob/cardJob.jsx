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
                    <p><b>{title}</b></p>
                    <p><b>Empresa: </b>{nameCompany}</p>
                    <p><b>Nível: </b>{level}</p>
                    <p><b>Local: </b>{local}</p>
                </div>
                <div></div>
                <div>
                    <b><p>Descrição: </p></b>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    )
}