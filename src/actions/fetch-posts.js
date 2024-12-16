'use server'
import axios from '@/lib/axios'

export async function fetchPosts(page, apiUrl) {
    const url = `${apiUrl}?page=${page}`
    try {
        const response = await axios(url)
        const data = await response.data.data
        const meta = await response.data.meta
        return { data, meta }
    } catch (error) {
        return { data: [], meta: {} }
    }
}
