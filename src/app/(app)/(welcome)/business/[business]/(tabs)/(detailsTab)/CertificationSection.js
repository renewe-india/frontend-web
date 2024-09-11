import React from 'react'

const CertificationSection = ({ businessName }) => {
    const services = [
        {
            title: '20+ COUNTRIES',
            description:
                'We have professional photovoltaic partners in 20+ countries.',
            icon: '👥',
        },
        {
            title: 'EFFICIENT SERVICES',
            description:
                'Overseas warehouses in US and EU to provide more convenient and efficient services.',
            icon: '🚚',
        },
        {
            title: 'CERTIFICATIONS',
            description: 'Complete certifications and competitive prices.',
            icon: '🏅',
        },
        {
            title: 'FIVE-STAR PRAISE',
            description: 'Won five-star praise from 100% customers.',
            icon: '👍',
        },
    ]

    return (
        <div className="lg:p-6 bg-background">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">
                    {`Why Choose ${businessName}`}{' '}
                </h2>
                <p className="text-muted-foreground mb-6">
                    Contact us for more information and look forward to
                    cooperating with you
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 ">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="max-w-xs p-4 border rounded-lg shadow-lg bg-card">
                        <div className="flex items-center mb-2">
                            <span className="text-4xl text-primary">
                                {service.icon}
                            </span>
                            <h3 className="ml-3 text-lg font-semibold text-primary">
                                {service.title}
                            </h3>
                        </div>
                        <p className="text-muted-foreground">
                            {service.description}
                        </p>
                        <div className="mt-2 h-1 w-10 bg-primary" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CertificationSection
