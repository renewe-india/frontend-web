'use server'
import axios from '@/lib/axios'
import RequestHeader from '@/lib/RequestHeader'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
export async function getPaginatedData(page, apiUrl, limit) {
    const url = limit
        ? `${apiUrl}?page=${page}&limit=${limit}`
        : `${apiUrl}?page=${page}`
    const headers = await RequestHeader()
    try {
        const response = await axios.get(url, { headers })

        const data = await response.data.data
        const meta = await response.data.meta

        return { data, meta }
    } catch (error) {
        console.error('API Error:', error)
        if (error.response) {
            const status = error.response.status
            console.log('status', status)
            switch (status) {
                case 400:
                    redirect('/bad-request')
                    break
                case 404:
                    redirect('/page-not-found')
                    break
                case 500:
                    redirect('/internal-server-error')
                    break
                case 419:
                    cookies().delete('last-auth-check')
                    redirect('/login')
                    break
                default:
                    return { data: [], meta: { last_page: 1 } }
            }
        }
    }
}
