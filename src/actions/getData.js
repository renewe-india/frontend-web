'use server'
import axios from '@/lib/axios'
import RequestHeader from '@/lib/RequestHeader'

export async function getData(apiUrl) {
    const headers = await RequestHeader()

    try {
        const response = await axios.get(apiUrl, { headers })
        const data = response.data.data
        if (response.data.meta) {
            return { data, meta: response.data.meta }
        }
        return { data, error: null }
    } catch (error) {
        return { data: null, error: error.response }
    }
}
