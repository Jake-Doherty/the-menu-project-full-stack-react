import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../../context/UserContext.js";
import { useTheme as MuiTheme } from "@emotion/react";

export default function Profile() {
    const theme = MuiTheme();
    const { user, profile, handleProfileChange } = useUser();
    const [usernameInput, setUsernameInput] = useState("");
    const [bioInput, setBioInput] = useState("");

    const handleProfileUpdate = (e) => {
        console.log("handleProfileUpdate", bioInput, usernameInput);
        handleProfileChange({ username: usernameInput, bio: bioInput });
        setBioInput("");
        setUsernameInput("");
    };

    if (!user) {
        return <Navigate to="/auth/sign-in" />;
    }

    return (
        <div>
            <Box
                gap={2}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                }}
            >
                <Typography
                    sx={{ color: theme.palette.primary.contrastText }}
                    variant="h4"
                    component="h4"
                    gutterBottom
                >
                    Profile
                </Typography>
                <FormControl>
                    <TextField
                        focused={profile ? true : false}
                        name="username"
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                        value={usernameInput}
                        placeholder={profile ? profile.display_name : ""}
                        onChange={(e) => {
                            setUsernameInput(e.target.value);
                        }}
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        focused={profile ? true : false}
                        name="bio"
                        sx={{ width: "100%" }}
                        id="outlined-multiline-flexible"
                        label="Bio"
                        multiline
                        maxRows={4}
                        value={bioInput}
                        placeholder={profile ? profile.bio : null}
                        onChange={(e) => {
                            setBioInput(e.target.value);
                        }}
                    />
                </FormControl>
                <Button
                    variant="contained"
                    onClick={(e) => handleProfileUpdate(e)}
                >
                    {profile ? "Update" : "Create"}
                </Button>
            </Box>
        </div>
    );
}
