'use server'
import axios from '@/lib/axios'

export async function fetchPostBySlug(apiUrl, slug) {
    const url = `${apiUrl}/${slug}`

    try {
        const response = await axios.get(url)
        const data = response.data.data
        return { data }
    } catch (error) {
        return { data: null }
    }
}
