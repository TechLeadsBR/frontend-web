import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { Colors } from './../../services/constants/constants'
import 'react-toastify/dist/ReactToastify.css';

export default function ReactToast({ visible = false, textToast, status="" }) {

    useEffect(() => {
        return () => console.log('Desmontou')
    },[])

    const text = status === "success" ? "✅ " + textToast : "❌ " + textToast

    if (visible) toast(text)

    
    const progressStyleProps = String(status) === "success" ? Colors.green.hexadecimal : Colors.red.hexadecimal

    return (
        <ToastContainer
            autoClose={3000}
            progressStyle={{ background: progressStyleProps }}
            bodyStyle={{ color: "black" }}
        />
    )
}