import React, { memo } from 'react'
import { ToastContainer } from 'react-toastify'
import { Colors } from './../../services/constants/constants'
import 'react-toastify/dist/ReactToastify.css';

function ReactToast() {
    return (
        <ToastContainer
            autoClose={3000}
            progressStyle={{ background: Colors.matteBlack.hexadecimal }}
            bodyStyle={{ color: "black" }}
        />
    )
}

export default memo(ReactToast)