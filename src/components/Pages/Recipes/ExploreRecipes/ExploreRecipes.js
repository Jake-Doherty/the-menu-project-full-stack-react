import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../../../context/UserContext.js";
import { useTheme as MuiTheme } from "@emotion/react";

import {
    Autocomplete,
    Box,
    Modal,
    TextField,
    Typography,
} from "@mui/material/";
import { useRecipe } from "../../../../context/RecipeContext.js";

export default function ExploreRecipes() {
    const { user } = useUser();
    const theme = MuiTheme();
    const { nonSecretRecipes } = useRecipe();

    const [modalOpen, setModalOpen] = useState(false);
    const [modalRecipe, setModalRecipe] = useState({});

    const handleModalOpen = (recipe) => {
        console.log("recipe", recipe);
        setModalRecipe(recipe);
        setTimeout(() => {}, 5);
        console.log("modalRecipe", modalRecipe.ingredients);
        setModalOpen(true);
    };
    const handleModalClose = () => setModalOpen(false);

    if (!user) {
        return <Navigate to="/auth/sign-in" />;
    }

    return (
        <Box
            component={"section"}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                justifySelf: "flex-start",
                height: "100%",
                gap: 2,
            }}
        >
            <Box
                component={"article"}
                border={2}
                borderRadius={2}
                borderColor={theme.palette.primary.main}
                p={1}
                gap={2}
                sx={{
                    width: "max(300px, 40vw)",
                    minHeight: "50px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                }}
            >
                <Typography
                    variant="h4"
                    component={"h4"}
                    sx={{
                        color: theme.palette.primary.contrastText,
                        margin: "0",
                        padding: "0",
                    }}
                >
                    ExploreRecipes
                </Typography>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    freeSolo
                    getOptionLabel={(option) => option.dish_name}
                    options={nonSecretRecipes}
                    sx={{ width: 300 }}
                    renderOption={(props, option) => (
                        <Box component="li" {...props} key={option.id}>
                            {option.dish_name}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField {...params} label="Recipe Search" />
                    )}
                />
            </Box>
            <Box
                component={"article"}
                border={2}
                borderRadius={2}
                borderColor={theme.palette.primary.main}
                p={1}
                gap={2}
                sx={{
                    width: "max(275px, 40vw)",
                    maxHeight: "max(275px, 40vw)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyItems: "flex-start",
                    justifyContent: "flex-start",
                }}
            >
                <Typography
                    variant="h4"
                    component={"h4"}
                    sx={{
                        color: theme.palette.primary.contrastText,
                        margin: "0",
                        padding: "0",
                    }}
                >
                    Recipes
                </Typography>
                <Box
                    component={"ul"}
                    sx={{
                        width: "100%",
                        height: "100%",
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(100px, 1fr))",
                        gridTemplateRows:
                            "repeat(auto-fill, minmax(60px, 1fr))",
                        gridAutoFlow: "row",
                        gap: 2,
                        justifyContent: "center",
                        alignItems: "center",
                        listStyle: "none",
                        overflowY: "auto",
                        overflowX: "hidden",
                        scrollBehavior: "smooth",
                        padding: "0 0 0 5px",
                        margin: 0,
                    }}
                >
                    {nonSecretRecipes.map((recipe) => (
                        <Box
                            key={recipe.id}
                            variant="h6"
                            component={"li"}
                            onClick={() => handleModalOpen(recipe)}
                            sx={{
                                height: "20px",
                                width: "100px",
                                color: theme.palette.primary.contrastText,
                                margin: 1,
                                padding: 1,
                                cursor: "pointer",
                                backgroundColor: theme.palette.primary.dark,
                                borderRadius: 2,
                                textAlign: "center",
                                "&:hover": {
                                    backgroundColor: theme.palette.primary.main,
                                },
                            }}
                        >
                            {recipe.dish_name}
                        </Box>
                    ))}
                    <Modal
                        open={modalOpen}
                        onClose={handleModalClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: 400,
                                bgcolor: "background.paper",
                                border: "2px solid #000",
                                boxShadow: 24,
                                p: 4,
                            }}
                        >
                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                            >
                                {modalRecipe.dish_name}
                            </Typography>

                            <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                            >
                                {modalRecipe.notes}
                            </Typography>
                        </Box>
                    </Modal>
                </Box>
            </Box>
        </Box>
    );
}
