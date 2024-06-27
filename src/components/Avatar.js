import React from 'react'

const Avatar = ({ avatar, customClass }) => {
    return (
        <div className="avatar">
            <div className={'rounded-full' + ' ' + customClass}>
                {avatar ? (
                    <img
                        srcSet={avatar.srcset || ''}
                        src={avatar.url || '/images/user.svg'}
                        alt="Avatar"
                        width={32}
                        height={32}
                    />
                ) : (
                    <img
                        src="/images/user.svg"
                        alt="Default Avatar"
                        width={32}
                        height={32}
                    />
                )}
            </div>
        </div>
    )
}

export default Avatar
