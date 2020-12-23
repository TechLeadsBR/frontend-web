import React, { memo } from 'react'
import stylesCss from './loadingPage.module.css'
import { Images } from './../../assets/images'

function LoadingPage({ visible }) {

    return (
        visible && <div className={stylesCss.root}>
            <img src={Images.iconLoading} alt={"Rotate icon"} />
        </div>
    )
}

export default memo(LoadingPage)