import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import API from "../API";
import Button from "./Button";
import { Wrapper } from "./Login.styles";
import { Context } from "../context";

const Login = () => {
    const loginDetails = {
        username: "",
        password: "",
    };

    const [login, setLogin] = useState(loginDetails);
    const [error, setError] = useState(false);
    const [_user, setUser] = useContext(Context);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setError(false);
        try {
            const requestToken = await API.getRequestToken();
            const sessionId = await API.authenticate(
                requestToken,
                login.username,
                login.password
            );

            setUser({
                sessionId: sessionId.session_id,
                username: login.username,
            });

            navigate("/");
        } catch (ex) {
            setError(true);
        }
    };
    const handleInput = ({ currentTarget: input }) => {
        setLogin({ ...login, [input.name]: input.value });
    };

    return (
        <Wrapper>
            {error && <div className="error">Something went wrong...</div>}
            <label htmlFor="username">Username: </label>
            <input
                type="text"
                name="username"
                id="username"
                value={login.username}
                onChange={handleInput}
                required
            />
            <label htmlFor="password">Password: </label>
            <input
                type="password"
                name="password"
                id="password"
                value={login.password}
                onChange={handleInput}
                required
            />
            <Button text="Login" callback={handleSubmit} />
        </Wrapper>
    );
};

export default Login;
