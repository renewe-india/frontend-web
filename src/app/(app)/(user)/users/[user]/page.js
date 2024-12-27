import { getData } from '@/actions/getData'
import Image from '@/components/Image'
import Avatar from '@/components/ui/AvatarImage'
import FollowButton from '@/components/ui/FollowButton'
import MainCard from '@/components/ui/MainCard'

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
                    <Avatar
                        avatarUrl={userDetails?.avatar}
                        alt={userDetails?.name}
                        size="xl"
                        border={true}
                        isVerified={userDetails?.is_verified}
                        additionalClasses="absolute -bottom-16 md:-bottom-20 left-5"
                    />
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
