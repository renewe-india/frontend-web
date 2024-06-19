import { MoonLoader } from 'react-spinners'
const Loading = () => {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-inherit flex flex-col ">
            <MoonLoader color="#009a00" size={50} />
            Loading
        </div>
    )
}

export default Loading
