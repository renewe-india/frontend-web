'use server'
import axios from '@/lib/axios'
import RequestHeader from '@/lib/RequestHeader'

export async function getPaginatedData(page, apiUrl) {
    const url = `${apiUrl}?page=${page}`
    const headers = await RequestHeader()
    try {
        const response = await axios.get(url, { headers })

        const data = await response.data.data
        const meta = await response.data.meta
        return { data, meta }
    } catch (error) {
        return { data: [], meta: { last_page: 1 } }
    }
}
