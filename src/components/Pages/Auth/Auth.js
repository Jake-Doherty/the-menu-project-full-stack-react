import React, { useState } from "react";
import { NavLink, Navigate, useParams } from "react-router-dom";
import { useUser } from "../../../context/UserContext.js";
import { authUser } from "../../../services/auth.js";

import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const { type } = useParams();
    console.log("type", type);
    const { user, setUser } = useUser();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    if (user) {
        return <Navigate to="/home" />;
    }

    const submitAuth = async () => {
        try {
            const newUser = await authUser(email, password, type);
            setUser(newUser);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <div className="panel-tabs">
                <NavLink
                    className="is-size-6 has-text-weight-bold"
                    to="/auth/sign-in"
                    style={({ isActive }) => ({
                        display: !isActive ? "" : "none",
                    })}
                >
                    Have an account? Sign In here.
                </NavLink>
                <NavLink
                    className="is-size-6 has-text-weight-bold"
                    to="/auth/sign-up"
                    style={({ isActive }) => ({
                        display: !isActive ? "" : "none",
                    })}
                >
                    {`Don't have an account? Sign Up here.`}
                </NavLink>
            </div>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                <div>
                    <FormControl
                        sx={{ m: 1, width: "25ch" }}
                        variant="outlined"
                    >
                        <InputLabel htmlFor="outlined-email">Email</InputLabel>
                        <OutlinedInput
                            id="outlined-email"
                            type="email"
                            label="email"
                            defaultValue={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>
                    <FormControl
                        sx={{ m: 1, width: "25ch" }}
                        variant="outlined"
                    >
                        <InputLabel htmlFor="outlined-adornment-password">
                            Password
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? "text" : "password"}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            defaultValue={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>
                </div>
                <div className="control">
                    <Stack>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={submitAuth}
                        >
                            Submit
                        </Button>
                    </Stack>
                </div>
            </Box>
        </>
    );
}

/* <div id="login-container">
            <nav id="auth-nav">
                <h1 id="auth-header">Todo Login</h1>
                <div className="panel-tabs">
                    <NavLink
                        className="is-size-6 has-text-weight-bold"
                        to="/auth/sign-in"
                        style={({ isActive }) => ({
                            display: !isActive ? "" : "none",
                        })}
                    >
                        Have an account? Sign In here.
                    </NavLink>
                    <NavLink
                        className="is-size-6 has-text-weight-bold"
                        to="/auth/sign-up"
                        style={({ isActive }) => ({
                            display: !isActive ? "" : "none",
                        })}
                    >
                        {`Don't have an account? Sign Up here.`}
                    </NavLink>
                </div>
                <div className="auth-form">
                    <div className="input-container">
                        <label className="label">
                            <h4>Email</h4>
                            <input
                                className="input"
                                type="email"
                                placeholder="email@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="input-container">
                        <label className="label">
                            <h4>Password</h4>
                        </label>
                        <input
                            className="input"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className="control">
                    <Stack>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={submitAuth}
                        >
                            Submit
                        </Button>
                    </Stack>
                </div>
            </nav>
        </div> */
