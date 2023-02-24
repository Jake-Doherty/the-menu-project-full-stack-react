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
    const [modalDishName, setModalDishName] = useState("");
    const [modalIngredientList, setModalIngredientList] = useState([]);
    const [modalInstructionList, setModalInstructionList] = useState([]);
    const [modalNotes, setModalNotes] = useState("");

    const handleModalOpen = (recipe) => {
        console.log("recipe", recipe);
        setModalDishName(recipe.dish_name);
        setModalIngredientList(recipe.ingredients);
        setModalInstructionList(recipe.instructions);
        setModalNotes(recipe.notes);

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
                display: "grid",
                gridTemplateRows: "150px 1fr",
                justifyContent: "center",
                alignItems: "stretch",
                justifyItems: "center",
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
                    width: "max(320px, 40vw)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
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
                    width: "max(320px, 40vw)",
                    maxHeight: "max(275px, 60vh)",
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
                        width: "97%",
                        height: "100%",
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(120px, 1fr))",
                        gridTemplateRows: "repeat(auto-fit, minmax(60px, 1fr))",
                        gridAutoFlow: "row",
                        gap: "10px",
                        listStyle: "none",
                        overflowY: "auto",
                        overflowX: "hidden",
                        padding: "10px",
                        margin: "0px",
                        justifyItems: "center",
                        alignItems: "end",
                        alignContent: "stretch",
                    }}
                >
                    {nonSecretRecipes.map((recipe) => (
                        <Box
                            key={recipe.id}
                            variant="h6"
                            component={"li"}
                            onClick={() => handleModalOpen(recipe)}
                            sx={{
                                height: "60px",
                                width: "120px",
                                color: theme.palette.primary.contrastText,
                                cursor: "pointer",
                                // backgroundColor: theme.palette.primary.dark,
                                borderRadius: 2,
                                borderWidth: 2,
                                borderStyle: "solid",
                                borderColor: theme.palette.primary.main,
                                textAlign: "center",
                                wordBreak: "break-word",
                                "&:hover": {
                                    backgroundColor: theme.palette.primary.main,
                                    borderColor: theme.palette.primary.dark,
                                    transition: "all 0.2s ease-in-out",
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
                                width: "max(275px, 40vw)",
                                height: "max(275px, 60vh)",
                                bgcolor: theme.palette.primary.dark,
                                borderWidth: 2,
                                borderStyle: "solid",
                                borderColor: theme.palette.primary.main,
                                borderRadius: 2,
                                boxShadow: 24,
                                overflow: "auto",
                                p: 4,
                                "& *": {
                                    color: theme.palette.primary.contrastText,
                                },
                            }}
                        >
                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                            >
                                {modalDishName}
                            </Typography>

                            {modalIngredientList.map((ingredient, index) => (
                                <Typography
                                    key={index}
                                    id="modal-modal-title"
                                    variant="h6"
                                    component="h2"
                                >
                                    {ingredient.quantity} {ingredient.unit}{" "}
                                    {ingredient.ingredientName}
                                </Typography>
                            ))}

                            {modalInstructionList.map((instruction) => (
                                <Typography
                                    key={instruction.step}
                                    id="modal-modal-title"
                                    variant="h6"
                                    component="h2"
                                >
                                    Step: {instruction.step}{" "}
                                    {instruction.instruction}
                                </Typography>
                            ))}

                            <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2, wordWrap: "break-word" }}
                            >
                                {modalNotes}
                            </Typography>
                        </Box>
                    </Modal>
                </Box>
            </Box>
        </Box>
    );
}
