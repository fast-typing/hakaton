export interface Attraction {
    id: string
    title: string
    rating: number
    price: number
    reviews: Review[]
    description: string
    address: string
    time: string
    img: string
    coordinates: number[]
    // type: string
}

export interface Review {
    stars: number
    description: string
    title: string
}