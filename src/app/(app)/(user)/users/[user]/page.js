import ShowUserDetails from './ShowUserDetails'

export const metadata = {
    title: 'User Show',
}
export default function UserShow({ params }) {
    const username = params.user
    return (
        <>
            <ShowUserDetails username={username} />
        </>
    )
}
