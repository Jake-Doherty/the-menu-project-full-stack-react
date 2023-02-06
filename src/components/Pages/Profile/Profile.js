import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../../context/UserContext.js";

export default function Profile() {
    const { user, profile, setProfile } = useUser();
    const [usernameInput, setUsernameInput] = useState("");
    const [bioInput, setBioInput] = useState("");

    const [profileModel, setProfileModel] = useState({
        username: "",
        bio: "",
    });

    const handleChange = (e) => {
        e.target.name === "username" && setUsernameInput(e.target.value);
        e.target.name === "bio" && setBioInput(e.target.value);
        setProfileModel({
            username: usernameInput,
            bio: bioInput,
        });
    };
    // console.log(bioInput);

    const handleProfileUpdate = (e) => {
        setProfile(profileModel);
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
                <Typography variant="h4" component="h4" gutterBottom>
                    Profile
                </Typography>
                <FormControl>
                    <TextField
                        name="username"
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                        value={usernameInput}
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        name="bio"
                        sx={{ width: "100%" }}
                        id="outlined-multiline-flexible"
                        label="Bio"
                        multiline
                        maxRows={4}
                        defaultValue={bioInput}
                        onChange={handleChange}
                    />
                </FormControl>
                <Button
                    variant="contained"
                    onClick={(e) => handleProfileUpdate(e)}
                >
                    Update
                </Button>
            </Box>
        </div>
    );
}
