import React from 'react'
import stylesCss from './cardJob.module.css'

export default function CardJob({ srcImg }){
    return (
        <div className={stylesCss.root}>
            <img src={srcImg} alt={"Empresa"}/>
            <div>
                
            </div>
        </div>
    )
}