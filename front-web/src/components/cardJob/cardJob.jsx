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
    }
}){

    

    return (
        <div className={stylesCss.root}>
            <img src={srcImgCompany} alt={`Logo empresa ${nameCompany}`}/>
            <div className={stylesCss.jobInformations}>
                <div>
                    <p>{title}</p>
                    <p>{nameCompany}</p>
                    <p>{level}</p>
                    <p>{local}</p>
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