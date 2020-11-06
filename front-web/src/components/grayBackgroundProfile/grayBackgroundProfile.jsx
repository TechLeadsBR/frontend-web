import React, { useState } from 'react'
import stylesCss from './grayBackgroundProfile.module.css'
import ReactToast from './../reactToast/reactToast'
import { postImageAPI } from './../../services/api'
import { functionAfterTime } from './../../services/functions'

export default function GrayBackgroundProfile({ srcImgUser, children }) {

    const [toastProps, setToastProps] = useState({ text: null, visible: false, status: null })

    const toastFunction = (text, status="error") => {
        setToastProps({ visible: true, text, status })
        functionAfterTime(3000, () => setToastProps({ visible: false, text: null, status: null }))
    }

    const setNewImage = async (value) => {
        const newFormData = new FormData()
        newFormData.set("image", value)

        console.log(newFormData)
        try {
            const request = await postImageAPI("/upload", newFormData)

            if(request.status === 201) {
                console.log('Executou')
                toastFunction("Foto atualizada com sucesso!", "success")
            }
        } catch (error) {
            toastFunction("Erro ao atualizar foto, tenten novamente mais tarde")
        }
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
            <ReactToast 
                textToast={toastProps.text}
                status={toastProps.status}
                visible={toastProps.visible}                
            />
        </div>
    )
}