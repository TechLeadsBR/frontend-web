import React from 'react'
import stylesCss from './notFound.module.css'
import { Images } from './../../assets/images'

export default function NotFound() {
    return (
        <div className={stylesCss.container}>
            <img src={Images.imgNotFound} alt={"Not found"} />
        </div>
    )
}
