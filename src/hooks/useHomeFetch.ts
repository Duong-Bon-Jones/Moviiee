import { useState, useEffect } from "react";
import { isPersistedState } from "../helpers";
// API
import API, { Movie } from "../API";

const initialState = {
    page: 0,
    results: [] as Movie[],
    total_pages: 0,
    total_results: 0,
};

function useHomeFetch() {
    const [searchTerm, setSearchTerm] = useState("");
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const fetchMovies = async (page: number, searchTerm = "") => {
        try {
            setError(false);
            setLoading(true);
            const movies = await API.fetchMovies(searchTerm, page);

            setState((prev) => ({
                ...movies,
                results:
                    page > 1
                        ? [...prev.results, ...movies.results]
                        : [...movies.results],
            }));
            // * {} inside () because we're returning an object, so it will not mistake it as fn block.
        } catch (ex) {
            setError(true);
            console.log(ex.message);
        }

        setLoading(false);
    };

    // Initial and search
    useEffect(() => {
        if (!searchTerm) {
            const sessionState = isPersistedState("homeState");

            if (sessionState) {
                setState(sessionState);
                return;
            }
        }

        setState(initialState);
        fetchMovies(1, searchTerm);
    }, [searchTerm]);

    // Load more
    useEffect(() => {
        if (!isLoadingMore) return;
        // setState((prev) => ({ ...prev, page: prev.page + 1 }));
        fetchMovies(state.page + 1, searchTerm);
        setIsLoadingMore(false);
    }, [isLoadingMore, searchTerm, state.page]);

    // * empty array => useEffect only run once on mount.

    // Write to session storage.
    useEffect(() => {
        if (!searchTerm)
            sessionStorage.setItem("homeState", JSON.stringify(state));
    }, [searchTerm, state]);

    return {
        state,
        loading,
        error,
        setSearchTerm,
        searchTerm,
        setIsLoadingMore,
    };
}

export default useHomeFetch;
