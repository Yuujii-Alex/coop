export interface IGDBGame {
    id: number;
    name: string;
    slug: string;
    summary?: string;
    storyline?: string;
    cover?: {
        id: number;
        image_id: string;
    };
    artworks?: {
        image_id: string;
    }[];
    screenshots?: {
        image_id: string;
    }[];
    videos?: {
        video_id: string;
        name?: string;
    }[];
    first_release_date?: number; // Unix timestamp
    total_rating?: number;
    total_rating_count?: number;
    rating?: number;
    rating_count?: number;
    aggregated_rating?: number;
    aggregated_rating_count?: number;
    platforms?: {
        id: number;
        name: string;
        abbreviation?: string;
    }[];
    genres?: {
        id: number;
        name: string;
    }[];
    themes?: {
        id: number;
        name: string;
    }[];
    multiplayer_modes?: IGDBMultiplayerMode[];
    game_modes?: {
        id: number;
        name: string;
    }[];
    player_perspectives?: {
        id: number;
        name: string;
    }[];
    involved_companies?: {
        company?: {
            name?: string;
        };
        developer?: boolean;
        publisher?: boolean;
        porting?: boolean;
    }[];
    similar_games?: {
        id: number;
        name: string;
        slug: string;
        cover?: {
            image_id: string;
        };
    }[];
    franchises?: {
        name: string;
    }[];
    collection?: {
        name: string;
    };
    websites?: {
        url: string;
        category: number;
    }[];
    age_ratings?: {
        category?: number;
        rating?: number;
    }[];
    game_engines?: {
        name: string;
    }[];
    release_dates?: {
        date?: number;
        human?: string;
        platform?: {
            name?: string;
        };
    }[];
}

export interface IGDBMultiplayerMode {
    id: number;
    platform?: number;
    onlinecoop?: boolean;
    onlinecoopmax?: number;
    offlinecoop?: boolean;
    offlinecoopmax?: number;
    lancoop?: boolean;
    splitscreen?: boolean;
    splitscreenmax?: number;
    campaigncoop?: boolean;
    dropin?: boolean;
}