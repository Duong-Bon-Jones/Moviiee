/* eslint-disable react/prop-types */
import React from "react";
import { Wrapper, Content, Text } from "./MovieInfo.styles";
import Thumb from "../Thumb";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../config";
import NoImage from "../../images/no_image.jpg";
import { MovieState } from "../../hooks/useMovieFetch";

interface Props {
    movie: MovieState;
}

const MovieInfo: React.FC<Props> = ({ movie }) => {
    return (
        <Wrapper backdrop={movie.backdrop_path}>
            <Content>
                <Thumb
                    image={
                        movie.poster_path
                            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                            : NoImage
                    }
                />

                <Text>
                    <h1>{movie.title}</h1>

                    <h3>PLOT</h3>
                    <p>{movie.overview}</p>
                    <div className="rating-director">
                        <div>
                            <h3>RATING</h3>
                            <div className="score">{movie.vote_average}</div>
                        </div>
                        <div className="director">
                            <h3>DIRECTOR{movie.directors.length > 1 && `S`}</h3>
                            {movie.directors.map((d) => (
                                <p key={d.credit_id}>{d.name}</p>
                            ))}
                        </div>
                    </div>

                    <div className="main-cast">
                        <h3>MAIN CASTS</h3>
                        {movie.actors.slice(0, 5).map((a) => (
                            <p key={a.credit_id}>
                                {a.name} as{" "}
                                <span>
                                    {a.character.includes("voice")
                                        ? a.character.slice(0, -7)
                                        : a.character}
                                </span>
                            </p>
                        ))}
                    </div>

                    <p>Release date: {movie.release_date} </p>
                </Text>
            </Content>
        </Wrapper>
    );
};

export default MovieInfo;
