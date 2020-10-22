import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { Colors } from './../../services/constants/constants'
import 'react-toastify/dist/ReactToastify.css';

export default function ReactToast({ activated=false, textToast, status }){

    if(activated) toast(textToast)

    const progressStyle = status === "error" ? Colors : 
    
    return (
        <div>
            <ToastContainer 
                progressStyle={{ background: Colors.red.hexadecimal }}
                bodyStyle={{ color: Colors.white.hexadecimal }}
            />
        </div>
    )
}