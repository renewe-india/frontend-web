'use client'
import React, { useEffect, useState } from 'react'
import InputField from '@/components/ui/InputField'
import SubmitButton from '@/components/ui/SubmitButton'
import axios from '@/lib/axios'
import SuccessDisplay from '@/components/ui/SuccessDisplay'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/UserContext'
import MainCard from '@/components/ui/MainCard'

const page = () => {
    const { user, isLoading } = useUser()
    const [username, setUsername] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const router = useRouter()

    useEffect(() => {
        if (!isLoading) {
            setUsername(user?.username)
        }
    }, [user])

    const handleSubmit = async e => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        try {
            const response = await axios.patch(`/user/update/username`, {
                username,
            })

            if (response.status === 204) {
                setSuccess('Username Updated Successfully!')
                setTimeout(() => setSuccess(null), router.push('/'), 3000)
            }
        } catch (err) {
            setError(err.response.data.errors)
            setTimeout(() => setError(null), 3000)
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <MainCard title={'Change your username'}>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 form-control">
                <InputField
                    label="Username"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    error={error?.username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />

                <SubmitButton
                    isSubmitting={isSubmitting}
                    label="Update Username"
                />
                {success && <SuccessDisplay success={success} />}
            </form>
        </MainCard>
    )
}

export default page
