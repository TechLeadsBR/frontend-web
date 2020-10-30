import React from 'react'
import stylesCss from './grayBackgroundProfile.module.css'

import { Colors } from '../../services/constants/constants'

export default function GrayBackgroundProfile({ srcImgUser, children }) {

    return (
        <div className={stylesCss.root}>
            <div>
                <div>
                    <img src={srcImgUser} alt="Foto do Usuário" />
                </div>
                {children}
            </div>
            
        </div>
    )
}