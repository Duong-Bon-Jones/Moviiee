import React, { ReactNode } from "react";
// Styles
import { Wrapper, Content } from "./Grid.styles";

interface Props {
    header: string;
}

const Grid: React.FC<Props> = ({ header, children }) => {
    return (
        <Wrapper>
            <h1>{header}</h1>
            <Content>{children}</Content>
        </Wrapper>
    );
};

export default Grid;
