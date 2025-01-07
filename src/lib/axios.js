import Axios from 'axios'

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true,
})

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            const status = error.response.status

            if (typeof window !== 'undefined') {
                if (status === 403) {
                    const previousPage = '/'
                    const errorMessage = encodeURIComponent(
                        error.response.data?.message ||
                            "You don't have permission to access this page.",
                    )

                    window.location.href = `${previousPage}?error=${errorMessage}`
                } else if (status === 400) {
                    window.location.href = '/bad-request'
                } else if (status === 404) {
                    window.location.href = '/page-not-found'
                } else if (status === 500) {
                    window.location.href = '/internal-server-error'
                } else if (status === 422) {
                    return Promise.reject(error)
                } else if (status === 419) {
                    document.cookie.split(';').forEach(cookie => {
                        const name = cookie.split('=')[0].trim()
                        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
                    })

                    localStorage.clear()
                    sessionStorage.clear()

                    const errorMessage = encodeURIComponent(
                        'Something went wrong, please try again.',
                    )
                    window.location.href = `/login?error=${errorMessage}`
                }
            }
        } else {
            return Promise.reject(error)
        }
        return Promise.reject(error)
    },
)

export default axios
