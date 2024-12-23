'use server'
import axios from '@/lib/axios'
import RequestHeader from '@/lib/RequestHeader'

export async function getData(apiUrl) {
    const headers = await RequestHeader()

    try {
        const response = await axios.get(apiUrl, { headers })
        const data = response.data.data
        return { data }
    } catch (error) {
        return { data: null }
    }
}
