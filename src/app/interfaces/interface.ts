export interface Attraction {
    id: string
    title: string
    rating: {
        stars: number
        quantity: number
    }
    price: number
    reviews: Review[]
    description: string
    address: string
    time: string
    img: string
    coordinates: number[]
    isFavorite: boolean
    categories: string[]
    type: string
    city: string
}

export interface Review {
    stars: number
    description: string
    title: string
}

export interface User {
    id: string
    userName: string
    email: string
    password: string
}