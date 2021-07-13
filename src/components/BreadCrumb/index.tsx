import React from "react";
import { Wrapper, Content, StyledLink } from "./BreadCrumb.styles";

interface Props {
    movieTitle: string;
}

const BreadCrumb: React.FC<Props> = ({ movieTitle }) => {
    return (
        <Wrapper>
            <Content>
                <StyledLink to="/">
                    <span>Home</span>
                </StyledLink>
                <span>/</span>
                <span>{movieTitle}</span>
            </Content>
        </Wrapper>
    );
};

export default BreadCrumb;
