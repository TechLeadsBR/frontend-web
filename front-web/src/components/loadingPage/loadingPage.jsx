import React, { memo } from 'react'
import stylesCss from './loadingPage.module.css'
import iconLoading from './../../assets/images/icons/loading.png'

function LoadingPage({ visible }){

    return (
        visible && <div className={stylesCss.root}>
            <img src={iconLoading} alt={"Rotate icon"} />
        </div>
    )
}

export default memo(LoadingPage)