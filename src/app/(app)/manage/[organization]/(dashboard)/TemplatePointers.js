'use client'
import { useOrganization } from '@/context/OrganizationContext'

function TemplatePointers() {
    const org = useOrganization()

    return (
        <>
            <h1 className="text-2xl mt-8 font-bold flex items-center gap-3">
                Welcome to {org.display_name}
            </h1>
            <p className="py-2 mt-4">
                ✓ <span className="font-semibold">Light/dark</span> mode toggle
            </p>

            <p className="py-2">
                ✓ <span className="font-semibold">Use Desktop </span> for better
                experience.
            </p>
            <p className="py-2  ">
                ✓ User-friendly <span className="font-semibold">Interface</span>
            </p>
        </>
    )
}

export default TemplatePointers
