import React from 'react'
import stylesCss from './fileUploadInput.module.css'
import iconUploadFile from './../../assets/images/icons/files.png'
import { useState } from 'react'
import { useRef } from 'react'

export default function FileUploadInput({ callbackWithFile }) {

    const [nameFile, setNameFile] = useState(null)
    const file = useRef()

    const setNewFile = (valueState) => {
        if (callbackWithFile) callbackWithFile(file)
        setNameFile(String(valueState).split('\\')[2])
    }

    return (
        <div className={stylesCss.root}>
            <label htmlFor={"img"}>
                <img src={iconUploadFile} alt={"Icone upload file"} />
            </label>
            <div>
                {!nameFile ? <label htmlFor={"img"}>Carregue sua imagem...</label> :
                    <p>{nameFile}</p>}
            </div>
            <input
                id="img"
                type="file"
                onChange={event => setNewFile(event.target.value)}
                ref={file}
            />
        </div>
    )
}