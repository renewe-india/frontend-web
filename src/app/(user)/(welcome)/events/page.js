import { Calendar, MapPin } from '@phosphor-icons/react/dist/ssr'

export const metadata = {
    title: 'Events',
}

const Events = () => {
    return (
        <>
            <div className="card bg-base-200 rounded-lg p-5">
                <div>
                    <a href="#" className="space-y-2">
                        <div className="flex items-start">
                            <div className="flex flex-col gap-1 flex-grow">
                                <div className="font-bold">
                                    Renewable Energy India Expo
                                </div>
                                <div className="inline-flex items-center gap-1">
                                    <Calendar size={24} />
                                    <div>3rd Oct, 24 - 5th Oct, 24</div>
                                </div>

                                <div className="inline-flex items-center gap-1">
                                    <MapPin size={24} />
                                    <div>
                                        India Expo Center, Grater Noida, India
                                    </div>
                                </div>
                                {/* <!--[if ENDBLOCK]><![endif]--> */}
                            </div>
                            <div className="flex items-end gap-2">
                                <div className="avatar">
                                    <div className="w-7 rounded-full !rounded !h-24 !w-24">
                                        <img
                                            src="https://picsum.photos/400"
                                            alt="avatar"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="badge">Solar Exhibition</div>
                            <div className="badge">India</div>
                            <div className="badge">Delhi</div>
                        </div>
                        <p className="text-sm text-gray-500">
                            Renewable Energy India Expo popularly known as REI
                            offers an all-inclusive platform to domestic and
                            international manufacturers, traders, buyers and
                            professionals from across the renewable energy
                            domain. REI is recognized as Asia’s Leading b2b expo
                            focusing on Solar Energy, Wind Energy, Bio-Energy,
                            Energy Storage and Electric Vehicles and charging
                            infra.
                        </p>
                    </a>
                </div>
            </div>
        </>
    )
}

export default Events
