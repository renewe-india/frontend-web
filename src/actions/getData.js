'use server'
import axios from '@/lib/axios'
import RequestHeader from '@/lib/RequestHeader'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function getData(apiUrl) {
    const headers = await RequestHeader()

    try {
        const response = await axios.get(apiUrl, { headers })
        const data = response.data.data

        if (response.data.meta) {
            return { data, meta: response.data.meta, error: null }
        }
        return { data, error: null }
    } catch (error) {
        console.error('API Error:', error)

        if (error.response) {
            const status = error.response.status
            console.log('status', status)
            switch (status) {
                case 403:
                    redirect(`/?error=${error.response.data?.message}`)
                    break
                case 400:
                    redirect('/bad-request')
                    break
                case 404:
                    redirect('/page-not-found')
                    break
                case 500:
                    redirect('/internal-server-error')
                    break
                case 422:
                    return { data: null, error: error }
                case 419:
                    cookies().delete('last-auth-check')
                    redirect('/login')
                    break
                default:
                    return { data: null, error: { message: 'Unknown Error' } }
            }
        } else {
            return { data: null, error: { message: 'Unknown Error' } }
        }
    }
}
