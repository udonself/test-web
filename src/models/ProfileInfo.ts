export interface UserCategory {
    icon: string,
    name: string
}

export interface UserReview {
    from_id: number,
    from_avatar: string,
    from_username: string,
    date: string,
    rating: number,
    content: string
}
    
export interface ProfileInfo {
    id: number,
    role: string,
    username: string,
    avatar: string,
    avg_rating: number | null,
    user_categories: UserCategory[],
    user_reviews: UserReview[]
}