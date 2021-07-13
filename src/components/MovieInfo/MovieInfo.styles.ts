import styled from "styled-components";
import { IMAGE_BASE_URL, BACKDROP_SIZE } from "../../config";

interface Props {
    backdrop: string;
}

export const Wrapper = styled.div<Props>`
    background: ${({ backdrop }) =>
        backdrop
            ? `url('${IMAGE_BASE_URL}${BACKDROP_SIZE}${backdrop}')`
            : "#000"};
    background-size: cover;
    background-position: center;
    padding: 40px 20px;
    animation: animateMovieInfo 1s;

    @keyframes animateMovieInfo {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

export const Content = styled.div`
    display: flex;
    max-width: 1280px;

    margin: 0 auto;
    background: rgb(0, 0, 0, 0.7);
    border-radius: 20px;

    @media screen and (max-width: 768px) {
        display: block;
        max-height: none;
    }
`;

export const Text = styled.div`
    width: 100%;
    padding: 20px 40px;
    color: var(--white);
    overflow: hidden;

    .rating-director {
        display: flex;
        justify-content: flex-start;
    }

    .score {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 35px;
        height: 35px;
        background: #fff;
        color: #000;
        font-weight: 800;
        border-radius: 25px;
        margin: 0px 0 0 0;
    }

    .main-cast {
        margin-block: 40px;

        span {
            font-style: italic;
            color: orange;
        }
    }

    .director {
        margin: 0 0 0 40px;

        p {
            margin: 0;
        }
    }

    h1 {
        @media screen and (max-width: 768px) {
            font-size: var(--fontBig);
        }
    }
`;
