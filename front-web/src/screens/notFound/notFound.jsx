import React from 'react'
import imgNotFound from './../../assets/images/universal/error_404.png'
import stylesCss from './notFound.module.css'


export default function NotFound() {
    return (
        <div className={stylesCss.container}>
            <img src={imgNotFound} alt={"Not found"} />
        </div>
    )
}
