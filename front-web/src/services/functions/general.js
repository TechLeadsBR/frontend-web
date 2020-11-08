import { toast } from 'react-toastify'

export const functionAfterTime = (seconds, callback) => {
    setTimeout(() => {
        callback()
    }, seconds);
}

export const messageToast = (message, status) => {
    if (!message || !status) throw new Error('Necessário passar mensagem e status')
    if (status === "success") return toast("✅ " + message)
    if (status === "error") return toast("❌ " + message)
    else throw new Error("Status mensagem não encontrado: " + status)
}