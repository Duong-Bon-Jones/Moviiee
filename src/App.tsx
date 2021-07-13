import React from "react";
import Home from "./components/Home";
import Header from "./components/Header";
import { GlobalStyle } from "./GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movie from "./components/Movie";
import NotFound from "./components/NotFound";

const App: React.FC = () => (
    <BrowserRouter>
        <Header />

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:movieId" element={<Movie />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>

        <GlobalStyle />
    </BrowserRouter>
);

export default App;
