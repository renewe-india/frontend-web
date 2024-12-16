export default function PostSkeleton() {
    return (
        <div className="card card-bordered shadow-md bg-base-200 rounded-lg p-4">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-300 skeleton" />
                    <div>
                        <div className="w-24 h-4 bg-gray-300 skeleton mb-2" />
                        <div className="w-16 h-4 bg-gray-300 skeleton" />
                    </div>
                </div>
                <div className="w-12 h-4 bg-gray-300 skeleton" />
            </div>
            <div className="px-4 pb-4">
                <div className="w-full h-4 bg-gray-300 skeleton mb-2" />
                <div className="w-full h-4 bg-gray-300 skeleton mb-2" />
                <div className="w-full h-4 bg-gray-300 skeleton mb-2" />
            </div>
            <div className="relative w-full aspect-video bg-gray-300 skeleton" />
            <div className="mx-7 flex justify-between border-b-2 border-gray-300 dark:border-gray-600 py-2">
                <div className="w-24 h-4 bg-gray-300 skeleton" />
                <div className="flex gap-4">
                    <div className="w-16 h-4 bg-gray-300 skeleton" />
                    <div className="w-16 h-4 bg-gray-300 skeleton" />
                </div>
            </div>
            <div className="p-4">
                <div className="grid grid-cols-4 gap-2">
                    <div className="w-20 h-6 bg-gray-300 skeleton" />
                    <div className="w-20 h-6 bg-gray-300 skeleton" />
                    <div className="w-20 h-6 bg-gray-300 skeleton" />
                    <div className="w-20 h-6 bg-gray-300 skeleton" />
                </div>
            </div>
        </div>
    )
}
