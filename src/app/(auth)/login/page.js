import { Suspense } from 'react'
import Login from './loginpage'
export const metadata = {
    title: 'Login - Renewe',
}
const LoginPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Login />
        </Suspense>
    )
}

export default LoginPage
