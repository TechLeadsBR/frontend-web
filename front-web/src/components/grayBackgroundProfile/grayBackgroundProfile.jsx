import React from 'react'
import stylesCss from './grayBackgroundProfile.module.css'
import { postImageAPI } from './../../services/api'

export default function GrayBackgroundProfile({ srcImgUser, children }) {

    const setNewImage = async (value) => {
        const newFormData = new FormData()
        newFormData.set("image", value)

        console.log(newFormData)
        try {
            const request = await postImageAPI("/upload", newFormData)

            console.log(request)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={stylesCss.root}>
            <div>
                <div className={stylesCss.content}>
                    <label htmlFor="imagem">
                        <img src={srcImgUser} alt="Foto do Usuário" />
                    </label>
                    <p>Editar foto</p>
                </div>
                {children}
            </div>
            <input
                type="file"
                id={"imagem"}
                onChange={event => setNewImage(event.target.files[0])}
            />
        </div>
    )
}