import React, { useState, useEffect, useRef } from "react";
// Styles
import { Wrapper, Content } from "./SearchBar.styles";
// Image
import searchIcon from "../../images/search-icon.svg";

interface Props {
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<Props> = ({ setSearchTerm }) => {
    const [state, setState] = useState("");
    const initial = useRef(true);

    useEffect(() => {
        if (initial.current) {
            initial.current = false;
            return;
        }

        const timer = setTimeout(() => {
            setSearchTerm(state);
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [setSearchTerm, state]);

    return (
        <Wrapper>
            <Content>
                <img src={searchIcon} alt="search-icon" />
                <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Search Movie"
                    onChange={(e) => setState(e.currentTarget.value)}
                    value={state}
                />
            </Content>
        </Wrapper>
    );
};

export default SearchBar;
