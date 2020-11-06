import React from 'react'
import { ToastContainer } from 'react-toastify'
import { Colors } from './../../services/constants/constants'
import 'react-toastify/dist/ReactToastify.css';

export default function ReactToast() {
    return (
        <ToastContainer
            autoClose={3000}
            progressStyle={{ background: Colors.matteBlack.hexadecimal }}
            bodyStyle={{ color: "black" }}
        />
    )
}