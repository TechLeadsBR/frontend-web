import React from 'react'
import stylesCss from './notFound.module.css'
import { imgNotFound } from './../../assets/images'

export default function NotFound() {
    return (
        <div className={stylesCss.container}>
            <img src={imgNotFound} alt={"Not found"} />
        </div>
    )
}
