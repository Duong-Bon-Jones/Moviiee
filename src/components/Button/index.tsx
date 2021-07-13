import React from "react";
import { Wrapper } from "./Button.styles";

interface Props {
    text: string;
    callback: () => void;
}

const Button: React.FC<Props> = ({ text, callback }) => {
    return <Wrapper onClick={callback}>{text}</Wrapper>;
};

export default Button;
