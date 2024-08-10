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

            if (status === 403) {
                const previousPage = document.referrer || '/'
                window.location.href = previousPage
            } else if (status === 400) {
                window.location.href = '/bad-request'
            } else if (status === 404) {
                window.location.href = '/page-not-found'
            } else if (status === 500) {
                console.log(error)
                window.location.href = '/internal-server-error'
            } else if (status === 422) {
                return Promise.reject(error)
            }
        } else {
            return Promise.reject(error)
        }
        return Promise.reject(error)
    },
)

export default axios
