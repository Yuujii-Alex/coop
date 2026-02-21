import { IGDBGame } from "./types";

let accessToken: string | null = null;
let tokenExpiresAt: number = 0;

async function igdbQuery<T>(
    endpoint: string, body: string, p0: string, p1: number,
): Promise<T[]> {

    const token = await getAccessToken();

    const response = await fetch(
        `https://api.igdb.com/v4/${endpoint}`,
        {
            method: "POST",
            headers: {
                "Client-ID": process.env.IGDB_CLIENT_ID!,
                Authorization: `Bearer ${token}`,
                "Content-Type": "text/plain",
            },
            body,
        }
    );

    if (!response.ok) {
        throw new Error(
            `IGDB API error: ${response.status} ${response.statusText}`
        );
    }

    const data = await response.json();
    return data;
}

// AUTH - Get Twitch OAuth token for IGDB
async function getAccessToken(): Promise<string> {

    // Return cached token if still valid
    if (accessToken && Date.now() < tokenExpiresAt)
        return accessToken;

    const response = await fetch(
        `https://id.twitch.tv/oauth2/token`,
        {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                client_id: process.env.IGDB_CLIENT_ID!,
                client_secret: process.env.IGDB_CLIENT_SECRET!,
                grant_type: "client_credentials",
            }),
        }
    )

    const data = await response.json();
    accessToken = data.access_token;
    tokenExpiresAt = Date.now() + data.expires_in * 1000 - 60000; // Refresh 1 min early

    return accessToken!;
}

// SEARCH
export async function searchGames(
    query: string,
    limit: number = 20
): Promise<IGDBGame[]> {
    return igdbQuery<IGDBGame>(
        "games",
        `
    search "${query}";
    fields name, slug, summary, 
           cover.image_id, 
           platforms.id, platforms.name, platforms.abbreviation,
           multiplayer_modes.*;
    where multiplayer_modes != null;
    limit ${limit};
    `,
        `igdb:search:${query}:${limit}`,
        1800 // Cache searches for 30 min
    );
}