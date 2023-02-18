import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormGroup,
    Switch,
    TextField,
} from "@mui/material";
import Image from "mui-image";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../../context/UserContext.js";
import { useTheme as MuiTheme } from "@emotion/react";
import { useTheme } from "../../../context/ThemeContext.js";

export default function Profile() {
    const {
        user,
        profile,
        handleProfileChange,
        setProfileAvatarInput,
        profileAvatarUrl,
        themeInput,
    } = useUser();

    const theme = MuiTheme();

    const { toggleTheme } = useTheme();

    const [usernameInput, setUsernameInput] = useState("");
    const [bioInput, setBioInput] = useState("");

    const handleProfileUpdate = () => {
        handleProfileChange({
            username: usernameInput,
            bio: bioInput,
            darkMode: themeInput,
        });
        setBioInput("");
        setUsernameInput("");
    };

    if (!user) {
        return <Navigate to="/auth/sign-in" />;
    }

    return (
        <div>
            <Box
                border={2}
                borderRadius={2}
                borderColor={theme.palette.primary.main}
                p={5}
                gap={2}
                sx={{
                    width: "max(275px, 35vw)",
                    minHeight: "max(calc(100vh - 800px), 400px)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                }}
            >
                <FormControl>
                    <TextField
                        focused={profile && profile.display_name ? true : false}
                        name="username"
                        id="outlined-basic"
                        label="Username"
                        helperText="Enter a username"
                        sx={{
                            width: "max(300px, 30vw)",
                            alignSelf: "center",
                            justifySelf: "center",
                            "& .MuiInputBase-input.MuiOutlinedInput-input, .MuiInputBase-input.MuiOutlinedInput-input::placeholder":
                                {
                                    color: theme.palette.primary.contrastText,
                                    opacity: 0.8,
                                },
                            "& .css-1gjhcy5-MuiInputBase-input-MuiOutlinedInput-input, & .css-645khj-MuiFormHelperText-root":
                                {
                                    color: theme.palette.primary.contrastText,
                                },
                            "& .MuiOutlinedInput-root": {
                                "&.Mui-focused fieldset": {
                                    borderColor: theme.palette.primary.main,
                                },
                            },
                            "& .css-jnltum-MuiOutlinedInput-notchedOutline": {
                                borderColor: theme.palette.primary.main,
                            },
                        }}
                        variant="outlined"
                        value={usernameInput}
                        placeholder={
                            profile && profile.display_name
                                ? profile.display_name
                                : null
                        }
                        onChange={(e) => {
                            setUsernameInput(e.target.value);
                        }}
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        focused={profile && profile.bio ? true : false}
                        name="bio"
                        sx={{
                            width: "max(300px, 30vw)",
                            alignSelf: "center",
                            justifySelf: "center",
                            color: theme.palette.primary.contrastText,
                            "& .MuiInputBase-input.MuiOutlinedInput-input, .MuiInputBase-input.MuiOutlinedInput-input::placeholder":
                                {
                                    color: theme.palette.primary.contrastText,
                                    opacity: 0.8,
                                },
                            "& .css-vcg1b0-MuiInputBase-input-MuiOutlinedInput-input, & .css-645khj-MuiFormHelperText-root":
                                {
                                    color: theme.palette.primary.contrastText,
                                },
                            "& .MuiOutlinedInput-root": {
                                "&.Mui-focused fieldset": {
                                    borderColor: theme.palette.primary.main,
                                },
                            },
                            "& .css-jnltum-MuiOutlinedInput-notchedOutline": {
                                borderColor: theme.palette.primary.main,
                            },
                        }}
                        id="outlined-multiline-flexible"
                        label="Bio"
                        helperText="Tell us about yourself, Chef."
                        multiline
                        maxRows={4}
                        value={bioInput}
                        placeholder={
                            profile && profile.bio ? profile.bio : null
                        }
                        onChange={(e) => {
                            setBioInput(e.target.value);
                        }}
                    />
                </FormControl>
                <FormGroup>
                    <FormControlLabel
                        sx={{
                            "& .MuiFormControlLabel-label": {
                                color: theme.palette.primary.contrastText,
                                fontWeight: "bold",
                            },
                        }}
                        control={
                            <Switch
                                checked={themeInput}
                                onClick={toggleTheme}
                                inputProps={{ "aria-label": "controlled" }}
                            />
                        }
                        label="Dark Mode"
                    />
                </FormGroup>
                <Button variant="contained" component="label">
                    Upload File
                    <input
                        onChange={(e) =>
                            setProfileAvatarInput(e.target.files[0])
                        }
                        type="file"
                        hidden
                    />
                </Button>

                <Image
                    sx={{
                        border: 2,
                        borderColor: theme.palette.primary.main,
                        borderRadius: "50%",
                    }}
                    width={300}
                    height={300}
                    showLoading={true}
                    errorIcon={false}
                    src={
                        profile &&
                        !profileAvatarUrl &&
                        !profile.avatar_image_url
                            ? "https://via.placeholder.com/300"
                            : profileAvatarUrl
                            ? profileAvatarUrl
                            : profile
                            ? profile.avatar_image_url
                            : "https://via.placeholder.com/300"
                    }
                    title="Profile Avatar"
                    alt="Profile Image"
                    aspectRatio={1}
                />

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
