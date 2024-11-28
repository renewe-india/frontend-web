import { useState, useEffect } from 'react'
import axios from '@/lib/axios'

const useFetchOptions = (url, cacheKey, shouldCache = false) => {
    const [options, setOptions] = useState([])

    useEffect(() => {
        const fetchOptions = async () => {
            if (shouldCache) {
                const cachedOptions = localStorage.getItem(cacheKey)
                if (cachedOptions) {
                    const cachedTimestamp = localStorage.getItem(
                        `${cacheKey}Timestamp`,
                    )
                    const isCacheValid =
                        cachedTimestamp &&
                        Date.now() - cachedTimestamp < 24 * 60 * 60 * 1000

                    if (isCacheValid) {
                        setOptions(JSON.parse(cachedOptions))
                        return
                    }
                }
            }
            try {
                const response = await axios.get(url)
                const data = Object.entries(response.data.data).map(
                    ([key, value]) => ({
                        value: key,
                        label: value,
                    }),
                )

                if (shouldCache) {
                    localStorage.setItem(cacheKey, JSON.stringify(data))
                    localStorage.setItem(`${cacheKey}Timestamp`, Date.now())
                }

                setOptions(data)
            } catch (error) {
                setOptions([])
            }
        }

        fetchOptions()
    }, [url, cacheKey, shouldCache])

    return options
}

export default useFetchOptions
