import { getData } from '@/actions/getData'
import Image from '@/components/Image'
import FollowButton from '@/components/ui/FollowButton'
import FollowersListModal from '@/components/ui/FollowersListModal'
import MainCard from '@/components/ui/MainCard'
import { ShieldCheck } from '@phosphor-icons/react/dist/ssr'

export const metadata = {
    title: 'User Show',
}
export default async function UserShow({ params }) {
    const username = params.user
    const { data: userDetails } = await getData(`/users/${username}`)

    return (
        <div className="space-y-2">
            <MainCard CardClassName={'flex flex-col gap-5'}>
                <div className="relative w-full h-auto rounded-lg">
                    <Image
                        data={userDetails?.backdrop}
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute -bottom-16 md:-bottom-20 left-5">
                        <Image
                            data={userDetails?.avatar}
                            className="avatar w-24 sm:w-32 md:w-36 rounded-full border-4 border-base-100"
                        />
                        {userDetails?.is_verified && (
                            <ShieldCheck
                                size={28}
                                color="#00a400"
                                weight="duotone"
                                className="absolute -bottom-2 right-1/2 transform translate-x-1/2 flex-shrink-0 bg-base-100 rounded-full p-1"
                            />
                        )}
                    </div>
                </div>
                <div className="mx-5 py-2 mt-16 flex flex-col gap-2">
                    <div className="font-bold text-base md:text-xl flex flex-col sm:flex-row items-start sm:items-center gap-2">
                        {userDetails?.name}
                        <FollowButton
                            entityType={'users'}
                            entityName={userDetails?.username}
                            isFollowing={userDetails?.is_following}
                        />
                    </div>
                    <div className="text-gray-500 line-clamp-1 max-w-2/4 text-xs md:text-sm">
                        {userDetails?.headline}
                    </div>
                    <div className="text-gray-500 text-xs md:text-sm">
                        <time dateTime={userDetails?.date_of_birth}>
                            <span>
                                {new Date(
                                    userDetails?.date_of_birth,
                                ).toLocaleString('default', {
                                    month: 'long',
                                    day: 'numeric',
                                })}
                                ,
                            </span>
                            <span>
                                {new Date(
                                    userDetails?.date_of_birth,
                                ).getFullYear()}
                            </span>
                        </time>
                    </div>
                    <FollowersListModal
                        followersCount={userDetails?.followers}
                        entityName={userDetails?.username}
                        entityType={'users'}
                    />
                </div>
            </MainCard>
            {userDetails?.headline && userDetails?.bio && (
                <MainCard>
                    <div className="mx-5 py-2">
                        <h2 className="card-title">About</h2>
                        <h2 className="text-base font-semibold my-4">
                            {userDetails?.headline}
                        </h2>
                        <p>{userDetails?.bio}</p>
                    </div>
                </MainCard>
            )}
        </div>
    )
}
