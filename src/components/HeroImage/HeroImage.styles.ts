import styled from "styled-components";

interface Props {
    image: string;
}

export const Wrapper = styled.div<Props>`
    background: ${({ image }) =>
        `linear-gradient(
      to bottom, rgba(0,0,0,0)
      39%,rgba(0,0,0,0)
      41%,rgba(0,0,0,0.65)
      100%
    ),
    url('${image}'), var(--darkGrey)`};
    background-size: 100%, contain;
    background-position: center;
    height: 75vh;
    position: relative;
    animation: animateHeroimage 1s;
    background-repeat: no-repeat;

    @keyframes animateHeroimage {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

export const Content = styled.div`
    padding: 20px;
    max-width: var(--maxWidth);
    margin: 0 auto;
`;

export const Text = styled.div`
    z-index: 100;
    max-width: 700px;
    position: absolute;
    bottom: 10px;
    left: 20%;
    margin-right: 20px;
    min-height: 100px;
    color: var(--white);

    h1 {
        font-size: var(--fontSuperBig);

        @media screen and (max-width: 720px) {
            font-size: var(--fontBig);
        }
    }

    p {
        font-size: var(--fontMed);

        @media screen and (max-width: 720px) {
            font-size: var(--fontSmall);
        }
    }

    @media screen and (max-width: 720px) {
        max-width: 100%;
    }
`;
