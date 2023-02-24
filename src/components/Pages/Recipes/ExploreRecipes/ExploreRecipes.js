import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../../../context/UserContext.js";
import { useTheme as MuiTheme } from "@emotion/react";

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Autocomplete,
    Box,
    Modal,
    TextField,
    Typography,
} from "@mui/material/";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleModalOpen = (recipe) => {
        console.log("recipe", recipe);
        setModalDishName(recipe.dish_name);
        setModalIngredientList(recipe.ingredients);
        setModalInstructionList(recipe.instructions);
        setModalNotes(recipe.notes);

        setModalOpen(true);
    };
    const handleModalClose = () => {
        setModalOpen(false);
    };

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
                                variant="h3"
                                component="h3"
                                align="center"
                                mb={2}
                            >
                                {modalDishName}
                            </Typography>
                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                                sx={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    textDecoration: "underline",
                                }}
                            >
                                Ingredients
                            </Typography>
                            {modalIngredientList.map((ingredient, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        width: "100%",
                                        borderBottom: "1px solid",
                                        marginBottom: "5px",
                                    }}
                                >
                                    <Typography
                                        id="modal-modal-title"
                                        variant="h6"
                                        component="h2"
                                    >
                                        {ingredient.quantity} {ingredient.unit}{" "}
                                    </Typography>
                                    <Typography variant="span" component="span">
                                        {ingredient.ingredientName}
                                    </Typography>
                                </Box>
                            ))}

                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h6"
                                sx={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    textDecoration: "underline",
                                }}
                            >
                                Instructions
                            </Typography>
                            {modalInstructionList.map((instruction) => (
                                <Accordion
                                    key={instruction.step}
                                    expanded={
                                        expanded === `panel${instruction.step}`
                                    }
                                    onChange={handleChange(
                                        `panel${instruction.step}`
                                    )}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel4bh-content"
                                        id="panel4bh-header"
                                    >
                                        <Typography
                                            id="modal-modal-title"
                                            variant="h6"
                                            component="h6"
                                            sx={{ width: "33%", flexShrink: 0 }}
                                        >
                                            Step: {instruction.step}{" "}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography
                                            variant="span"
                                            component="span"
                                        >
                                            {instruction.instruction}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                // <Box key={instruction.step} sx={{ mb: 2 }}>
                                //     <Typography
                                //         id="modal-modal-title"
                                //         variant="h6"
                                //         component="h6"
                                //     >
                                //         Step: {instruction.step}{" "}
                                //     </Typography>
                                //     <Typography variant="span" component="span">
                                //         {instruction.instruction}
                                //     </Typography>
                                // </Box>
                            ))}
                            {modalNotes ? (
                                <>
                                    <Typography
                                        id="modal-modal-title"
                                        variant="h6"
                                        component="h6"
                                        sx={{
                                            textAlign: "center",
                                            fontWeight: "bold",
                                            textDecoration: "underline",
                                        }}
                                    >
                                        Notes
                                    </Typography>
                                    <Typography
                                        id="modal-modal-description"
                                        sx={{ mt: 2, wordWrap: "break-word" }}
                                    >
                                        {modalNotes}
                                    </Typography>
                                </>
                            ) : null}
                        </Box>
                    </Modal>
                </Box>
            </Box>
        </Box>
    );
}
