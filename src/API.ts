import {
    SEARCH_BASE_URL,
    POPULAR_BASE_URL,
    API_URL,
    API_KEY,
    REQUEST_TOKEN_URL,
    LOGIN_URL,
    SESSION_ID_URL,
} from "./config";

const defaultConfig = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
};

// Types
export interface Movie {
    backdrop_path: string;
    id: number;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    title: string;
    vote_average: number;
    vote_count: number;
    budget: number;
    runtime: number;
    revenue: number;
    release_date: string;
}
export interface Movies {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export interface Cast {
    [property: string]: string;

    // character: string;
    // credit_id: string;
    // name: string;
    // profile_path: string;
}

export interface Crew {
    job: string;
    credit_id: number;
    name: string;
}

export interface Credits {
    id: number;
    cast: Cast[];
    crew: Crew[];
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    fetchMovies: async (searchTerm: string, page: number): Promise<Movies> => {
        const endpoint: string = searchTerm
            ? `${SEARCH_BASE_URL}${searchTerm}&page=${page}`
            : `${POPULAR_BASE_URL}&page=${page}`;
        return await (await fetch(endpoint)).json();
    },

    fetchMovie: async (movieId: string): Promise<Movie> => {
        const endpoint: string = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
        return await (await fetch(endpoint)).json();
    },

    fetchCredits: async (movieId: string): Promise<Credits> => {
        const creditsEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        return await (await fetch(creditsEndpoint)).json();
    },

    // Bonus material below for login
    getRequestToken: async () => {
        const reqToken = await (await fetch(REQUEST_TOKEN_URL)).json();
        return reqToken.request_token;
    },

    rateMovie: async (sessionId: string, movieId: number, value: number) => {
        const endpoint = `${API_URL}movie/${movieId}/rating?api_key=${API_KEY}&session_id=${sessionId}`;

        const rating = await (
            await fetch(endpoint, {
                ...defaultConfig,
                body: JSON.stringify({ value }),
            })
        ).json();

        return rating;
    },

    authenticate: async (
        requestToken: string,
        username: string,
        password: string
    ) => {
        const bodyData = {
            username,
            password,
            request_token: requestToken,
        };
        // First authenticate the requestToken
        const data = await (
            await fetch(LOGIN_URL, {
                ...defaultConfig,
                body: JSON.stringify(bodyData),
            })
        ).json();
        // Then get the sessionId with the requestToken
        if (data.success) {
            const sessionId = await (
                await fetch(SESSION_ID_URL, {
                    ...defaultConfig,
                    body: JSON.stringify({ request_token: requestToken }),
                })
            ).json();
            return sessionId;
        }
    },
};
