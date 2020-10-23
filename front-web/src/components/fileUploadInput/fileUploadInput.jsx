import React from 'react'
import stylesCss from './fileUploadInput.module.css'

export default function FileUploadInput(){
    return (
        <div className={stylesCss.root}>
            <label htmlFor="img">Carregue sua imagem</label>
            <input id="img" type="file"/>
        </div>
    )
}