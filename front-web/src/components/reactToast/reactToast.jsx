import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { Colors } from './../../services/constants/constants'
import 'react-toastify/dist/ReactToastify.css';

export default function ReactToast({ visible = false, textToast, status=null }) {

    const text = status === "success" ? "✅ " + textToast : "❌ " + textToast

    if (visible) toast(text)
    
    return (
        <ToastContainer
            autoClose={3000}
            progressStyle={{ background: Colors.matteBlack.hexadecimal }}
            bodyStyle={{ color: "black" }}
        />
    )
}