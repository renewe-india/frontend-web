'use server'
import { cookies } from 'next/headers'

const RequestHeader = async () => ({
    Referer: process.env.NEXT_PUBLIC_FRONTEND_URL,
    Cookie: cookies().toString(),
    'X-XSRF-TOKEN': cookies().get('XSRF-TOKEN')?.value,
})
export default RequestHeader
