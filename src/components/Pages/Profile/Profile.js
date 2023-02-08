import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import Image from "mui-image";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../../context/UserContext.js";
import { useTheme as MuiTheme } from "@emotion/react";

export default function Profile() {
    const theme = MuiTheme();
    const {
        user,
        profile,
        handleProfileChange,
        profileAvatarInput,
        setProfileAvatarInput,
        profileAvatarUrl,
    } = useUser();
    const [usernameInput, setUsernameInput] = useState("");
    const [bioInput, setBioInput] = useState("");

    console.log(profile);

    const handleProfileUpdate = () => {
        handleProfileChange({
            username: usernameInput,
            bio: bioInput,
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
                border={1}
                borderRadius={2}
                borderColor={theme.palette.primary.main}
                p={5}
                gap={2}
                sx={{
                    width: "max(275px, 35vw)",
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
                        sx={{
                            width: "max(300px, 30vw)",
                            alignSelf: "center",
                            justifySelf: "center",
                        }}
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
                        sx={{
                            width: "max(300px, 30vw)",
                            alignSelf: "center",
                            justifySelf: "center",
                        }}
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
                {profile ? (
                    <Image
                        sx={{ borderRadius: "50%" }}
                        width={300}
                        height={300}
                        showLoading={true}
                        errorIcon={true}
                        src={
                            !profileAvatarInput && !profile.avatar_image_url
                                ? "https://via.placeholder.com/150"
                                : profileAvatarUrl
                        }
                        title="Profile Avatar"
                        alt="Profile Image"
                        aspectRatio={1}
                    />
                ) : (
                    <Image src="https://via.placeholder.com/150" />
                )}
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
