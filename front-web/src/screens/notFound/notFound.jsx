import React from 'react'
import imgNotFound from './../../assets/images/universal/error_404.png'
import '../notFound/notFound.css'


export default function NotFound(){
    return (
        <div>
            <div className="container">
                    <img src={imgNotFound}/>   
            </div>
        </div>
    )
}