import React from "react";
// API
// import API from "../API";
// Config
import { BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";

// Hook
import useHomeFetch from "../hooks/useHomeFetch";

// Image
import NoImage from "../images/no_image.jpg";

// Components
import HeroImage from "./HeroImage";
import Grid from "./Grid";
import Thumb from "./Thumb";
import Spinner from "./Spinner";
import SearchBar from "./SearchBar";
import Button from "./Button";

const Home: React.FC = () => {
    const {
        state,
        loading,
        error,
        setSearchTerm,
        searchTerm,
        setIsLoadingMore,
    } = useHomeFetch();

    if (error) return <div>Something went wrong!</div>;

    return (
        <>
            {!searchTerm && state.results[0] && (
                <HeroImage
                    image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
                    title={state.results[0].original_title}
                    text={state.results[0].overview}
                />
            )}

            <SearchBar setSearchTerm={setSearchTerm} />

            <Grid header={searchTerm ? "Search Results" : "Popular Movies"}>
                {state.results.map((movie) => (
                    <Thumb
                        key={movie.id}
                        movieId={movie.id}
                        clickable
                        image={
                            movie.poster_path
                                ? `${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.poster_path}`
                                : NoImage
                        }
                    />
                ))}
            </Grid>
            {loading && <Spinner />}
            {state.page < state.total_pages && !loading && (
                <Button
                    text="Load more"
                    callback={() => setIsLoadingMore(true)}
                />
            )}
        </>
    );
};

export default Home;
