import React, { useState } from 'react'
import stylesCss from './buscarVagas.module.css'
import Header from './../../components/header/header'
import SearchJobs from './../../components/searchJobs/searchJobs'
import LoadingPage from './../../components/loadingPage/loadingPage'
import { functionAfterTime } from './../../services/functions'

export default function BuscarVagas() {

    const [showIconLoagingPage, setShowIconLoadingPage] = useState(true)

    return (
        <div className={stylesCss.root} onLoad={() => functionAfterTime(2000, () => setShowIconLoadingPage(!showIconLoagingPage))}>
            {showIconLoagingPage && <LoadingPage />}
            <Header typeHeader={"student"} />
            <SearchJobs 
                callbackValue={value => console.log(value)}
            />
        </div>
    )
}   