import { Suspense } from 'react'
import Login from './loginpage'

const LoginPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Login />
        </Suspense>
    )
}

export default LoginPage
