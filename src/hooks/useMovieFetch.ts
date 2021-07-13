import React, { useEffect, useState } from "react";
import API, { Movie, Cast, Crew } from "../API";
import { isPersistedState } from "../helpers";

export interface MovieState extends Movie {
    actors: Cast[];
    directors: Crew[];
}

const useMovieFetch = (movieId: string) => {
    const [state, setState] = useState<MovieState>({} as MovieState);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(false);
                const movie = await API.fetchMovie(movieId);
                const credits = await API.fetchCredits(movieId);
                // Get director
                const directors = credits.crew.filter(
                    (member) => member.job === "Director"
                );

                setState({ ...movie, actors: credits.cast, directors });
                setLoading(false);
            } catch (ex) {
                setError(true);
                console.log(ex);
            }
        };

        const sessionMovie = isPersistedState(movieId);
        if (sessionMovie) {
            setState(sessionMovie);
            setLoading(false);
            return;
        }

        fetchData();
    }, [movieId]);

    // Write to session storage.
    useEffect(() => {
        sessionStorage.setItem(movieId, JSON.stringify(state));
    }, [movieId, state]);

    return { state, loading, error };
};

export default useMovieFetch;
