import React from "react";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";
import Grid from "./Grid";
import Spinner from "./Spinner";
import NoImage from "../images/no_image.jpg";
import useMovieFetch from "../hooks/useMovieFetch";
import { useParams } from "react-router";
import BreadCrumb from "./BreadCrumb";
import MovieInfo from "./MovieInfo";
import Actor from "./Actor";
import MovieInfoBar from "./MovieInfoBar";

const Movie: React.FC = () => {
    const { movieId } = useParams();

    const { state: movie, loading, error } = useMovieFetch(movieId);

    if (loading) return <Spinner />;
    if (error) return <div>Something went wrong...</div>;

    return (
        <>
            <BreadCrumb movieTitle={movie.original_title} />
            <MovieInfo movie={movie} />
            <MovieInfoBar
                time={movie.runtime}
                budget={movie.budget}
                revenue={movie.revenue}
            />
            <Grid header="Actors">
                {movie.actors.map((a) => (
                    <Actor
                        key={a.credit_id}
                        name={a.name}
                        character={a.character}
                        imageUrl={
                            a.profile_path
                                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${a.profile_path}`
                                : NoImage
                        }
                    />
                ))}
            </Grid>
        </>
    );
};

export default Movie;
