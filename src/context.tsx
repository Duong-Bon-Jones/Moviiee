import React, { createContext, useState } from "react";

export const Context = createContext<>(null);

const UserProvider = ({ children }) => {
    const [state, setState] = useState(undefined);

    return (
        <Context.Provider value={[state, setState]}>
            {children}
        </Context.Provider>
    );
};
