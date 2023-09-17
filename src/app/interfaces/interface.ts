export interface Attraction {
    id: string
    title: string
    rating: number
    price: number
    // reviews: Review[]
    description?: string
    address: string
    time: string
    img?: string
    coordinates: number[]
    isFavorite: boolean
    categories: string[]
    type: string
}

// export interface Review {
//     stars: number
//     description: string
//     title: string
// }

export interface User {
    id: string
    userName: string
    email: string
    password: string
}