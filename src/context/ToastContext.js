import React, { createContext, useContext } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ToastContext = createContext()

export const useToast = () => {
    return useContext(ToastContext)
}

export const ToastProvider = ({ children }) => {
    const notifySuccess = message => toast.success(message)
    const notifyError = message => toast.error(message)

    return (
        <ToastContext.Provider value={{ notifySuccess, notifyError }}>
            {children}
        </ToastContext.Provider>
    )
}
