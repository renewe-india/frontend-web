import Link from 'next/link'
import Subtitle from '../Typography/Subtitle'

function TitleCard({ title, children, topMargin, TopSideButtonLink }) {
    return (
        <div
            className={
                'card w-full p-6 bg-base-100 shadow-xl ' + (topMargin || 'mt-6')
            }>
            {/* Title for Card */}
            <div className="flex items-center justify-between">
                <Subtitle styleClass={TopSideButtonLink ? 'inline-block' : ''}>
                    {title}
                </Subtitle>

                {/* Top side button, show only if present */}
                {TopSideButtonLink && (
                    <Link href={TopSideButtonLink.href}>
                        <div className=" btn btn-primary  sm:mt-0 mt-2">
                            {TopSideButtonLink.text}
                        </div>
                    </Link>
                )}
            </div>

            <div className="divider mt-2" />

            {/** Card Body */}
            <div className="h-full w-full pb-6 bg-base-100">{children}</div>
        </div>
    )
}

export default TitleCard
