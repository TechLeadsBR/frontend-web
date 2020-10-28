import React from 'react'
import stylesCss from './loadingPage.module.css'
import iconLoading from './../../assets/images/icons/loading.png'

export default function LoadinPage(){

    return (
        <div className={stylesCss.root}>
            <img src={iconLoading} alt={"Rotate icon"} />
        </div>
    )
}