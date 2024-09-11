import React from 'react'

const HeroProductList = () => {
    const products = [
        {
            id: 1,
            title: 'Product 1',
            description: 'This is an amazing product you should check out.',
            imageUrl:
                'https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80',
            link: '#',
        },
        {
            id: 2,
            title: 'Product 2',
            description: 'Another great product with many features.',
            imageUrl:
                'https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80',
            link: '#',
        },
        {
            id: 3,
            title: 'Product 3',
            description: 'You don’t want to miss this one!',
            imageUrl:
                'https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80',
            link: '#',
        },
    ]

    return (
        <div className="bg-background lg:p-6">
            <h2 className="text-2xl font-bold mb-2">HERO RECOMMENDATION</h2>
            <p className="text-muted-foreground mb-6">
                Better quality, better service
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map(product => (
                    <div
                        key={product.id}
                        className="bg-base-200 border border-border rounded-lg p-4 text-left">
                        <img
                            className="mx-auto mb-2 h-48 w-full object-cover"
                            src={product.imageUrl}
                            alt={product.title}
                        />
                        <h3 className="text-lg font-semibold mb-2">
                            {product.title}
                        </h3>
                        <p className="text-gray-500 mb-4">
                            {product.description}
                        </p>
                        <a
                            className="inline-block py-2 px-4 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700"
                            href={product.link}>
                            Buy Now
                        </a>
                    </div>
                ))}
            </div>
            {/* Full-width More button */}
            <div className="text-center mt-6">
                <button className="py-3 w-full text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 ">
                    More
                </button>
            </div>
        </div>
    )
}

export default HeroProductList
