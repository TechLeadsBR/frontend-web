import React from 'react'
import stylesCss from './grayBackgroundProfile.module.css'
import ReactToast from './../reactToast/reactToast'
import { messageToast } from './../../services/functions'
import { uploadActions } from './../../actions'

export default function GrayBackgroundProfile({ srcImgUser, children }) {

    const setNewImage = async (value) => {
        const newFormData = new FormData()
        newFormData.set("image", value)

        uploadActions.saveImage(newFormData)
            .then(() => messageToast("Foto atualizada com sucesso!", "success"))
            .catch(() => messageToast("Erro ao atualizar foto, tenten novamente mais tarde", "error"))
    }

    return (
        <div className={stylesCss.root}>
            <div>
                <div className={stylesCss.content}>
                    <label htmlFor="imagem">
                        <img src={srcImgUser} alt="Foto do Usuário" />
                        <small>Editar foto</small>
                    </label>
                </div>
                {children}
            </div>
            <input
                type="file"
                id={"imagem"}
                onChange={event => setNewImage(event.target.files[0])}
            />
            <ReactToast />
        </div>
    )
}
