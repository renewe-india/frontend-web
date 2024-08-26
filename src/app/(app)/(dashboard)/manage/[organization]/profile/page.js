'use client'
import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProfileSettings from './ProfileSettings'
import { getServerSideProps } from './ProfileServerProps'

export default async function ProfileSettingsPage() {
    const {
        companySizeOptions,
        companyTypeOptions,
    } = await getServerSideProps()
    const notifySuccess = message => {
        toast.success(message)
    }

    const notifyError = message => {
        toast.error(message)
    }

    return (
        <div>
            <ProfileSettings
                notifySuccess={notifySuccess}
                notifyError={notifyError}
                companySizeOptions={companySizeOptions}
                companyTypeOptions={companyTypeOptions}
            />
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}
