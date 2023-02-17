import React, { useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../../../context/UserContext.js";
import {
    InputLabel,
    FormControl,
    OutlinedInput,
    Typography,
    IconButton,
    TextField,
    MenuItem,
    Button,
} from "@mui/material/";
import AddBoxIcon from "@mui/icons-material/AddBox";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useTheme as useMuiTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
// import IngredientList from "./FormComponents/IngredientList.js";

export default function RecipeForm() {
    const { user } = useUser();

    const theme = useMuiTheme();

    const measurements = [
        {
            value: "Cup",
            label: "Cup",
        },
        {
            value: "TBSP",
            label: "TBSP",
        },
        {
            value: "TSP",
            label: "TSP",
        },
        {
            value: "Fl Oz",
            label: "Fl Oz",
        },
        {
            value: "pt",
            label: "Pint",
        },
        {
            value: "qt",
            label: "Quart",
        },
        {
            value: "gal",
            label: "Gallon",
        },
    ];

    const ingredientRef = useRef(null);
    const instructionRef = useRef(null);

    const [ingredientList, setIngredientList] = useState([
        {
            unit: "",
            quantity: "",
            ingredientName: "",
        },
    ]);

    const [instructionList, setInstructionList] = useState([
        {
            step: "",
            instruction: "",
        },
    ]);

    if (!user) {
        return <Navigate to="/auth/sign-in" />;
    }

    const handleIngredientInputChange = (e, index) => {
        const { name, value } = e.target;

        if (name === "ingredientName") {
            const list = [...ingredientList];
            list[index].ingredientName = value;
            console.log(list);
            setIngredientList(list);
        }

        if (name === "qty") {
            const list = [...ingredientList];
            list[index].quantity = value;
            console.log(list);
            setIngredientList(list);
        }

        if (name === "unit") {
            const list = [...ingredientList];
            list[index].unit = value;
            console.log(list);
            setIngredientList(list);
        }
    };

    const handleInstructionInputChange = (e, index) => {
        const { value } = e.target;

        const list = [...instructionList];
        list[index].instruction = value;
        console.log(list);
        setInstructionList(list);
    };

    const handleAddIngredient = () => {
        setIngredientList([
            ...ingredientList,
            {
                unit: "",
                quantity: "",
                ingredientName: "",
            },
        ]);
        setTimeout(() => {
            ingredientRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        }, 50);
    };

    const handleAddInstruction = () => {
        setInstructionList([
            ...instructionList,
            {
                step: "",
                instruction: "",
            },
        ]);
        setTimeout(() => {
            instructionRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        }, 50);
    };

    const handleRemoveClick = (obj, index) => {
        if (Object.keys(obj)[0] === "unit") {
            const list = [...ingredientList];
            list.splice(index, 1);
            console.log(list);
            setIngredientList(list);
        }

        if (Object.keys(obj)[0] === "step") {
            const list = [...instructionList];
            list.splice(index, 1);
            setInstructionList(list);
        }
    };

    return (
        <Box
            component={"section"}
            id="recipe-form"
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "max(calc(100vh - 80px), 400px)",
                width: "max(calc(100vw / 2), 350px)",
                alignItems: "center",
                justifyContent: "flex-start",
                border: 2,
                borderColor: theme.palette.primary.main,
                borderRadius: "10px",
                transition: "all 0.5s ease",
            }}
        >
            <Typography mt={1} variant="h6" color="primary">
                Add A Recipe
            </Typography>

            {/* DISH NAME HERE */}
            <FormControl
                sx={{
                    "& .MuiInputBase-root *": {
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                    },
                    "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                            borderColor: theme.palette.primary.main,
                        },
                    },
                    m: 1,
                    width: "80%",
                }}
                variant="outlined"
            >
                <InputLabel
                    component="label"
                    margin="dense"
                    htmlFor="outlined-dish-name"
                >
                    Dish Name
                </InputLabel>
                <OutlinedInput
                    name="dish-name"
                    id="outlined-dish-name"
                    type="text"
                    label="Dish Name"
                />
            </FormControl>

            {/* INGREDIENTS HERE */}
            <div
                style={{
                    display: "flex",
                    flexFlow: "row nowrap",
                    width: "80%",
                    height: "40px",
                    alignItems: "center",
                    justifyContent: "space-around",
                }}
            >
                <Typography
                    sx={{
                        color: theme.palette.primary.contrastText,
                    }}
                    variant="h6"
                    component="h6"
                >
                    Ingredients
                </Typography>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        margin: 1,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "1rem",
                            color: theme.palette.primary.contrastText,
                        }}
                        variant="h6"
                        component="h6"
                    >
                        Add an Ingredient
                    </Typography>
                    <IconButton
                        aria-label="add ingredient"
                        onClick={handleAddIngredient}
                        sx={{
                            scale: "1.25",
                            margin: "0 2.5%",
                            padding: "1",
                            m: 1,
                        }}
                    >
                        <AddBoxIcon
                            sx={{
                                color: theme.palette.success.light,
                            }}
                        />
                    </IconButton>
                </div>
            </div>
            <article
                id="ingredients-section"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "10px",
                    width: "80%",
                    maxHeight: "190px",
                    overflowY: "auto",
                    overflowX: "hidden",
                    margin: 1,
                    paddingTop: 5,
                }}
            >
                {ingredientList.map((ingredient, index) => {
                    return (
                        <div
                            ref={
                                ingredientList.length - 1 === index
                                    ? ingredientRef
                                    : null
                            }
                            className="ingredient"
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                            key={index}
                        >
                            <IconButton
                                sx={{
                                    scale: "1",
                                    margin: "0.5",
                                    padding: "1",
                                }}
                                aria-label="delete ingredient"
                                onClick={() =>
                                    handleRemoveClick(ingredient, index)
                                }
                            >
                                <RemoveCircleIcon
                                    sx={{
                                        color: theme.palette.error.light,
                                    }}
                                />
                            </IconButton>
                            <Typography
                                sx={{
                                    color: theme.palette.primary.contrastText,
                                }}
                                variant="h6"
                                component="h6"
                            >
                                {index + 1}.{" "}
                            </Typography>
                            <TextField
                                name="qty"
                                label="Qty."
                                inputProps={{
                                    inputMode: "numeric",
                                    pattern: "[0-99]*",
                                }}
                                sx={{
                                    width: "max(10%, 100px)",
                                    "& .MuiInputBase-root *": {
                                        borderColor: theme.palette.primary.main,
                                        color: theme.palette.primary
                                            .contrastText,
                                    },
                                }}
                                value={ingredient.quantity}
                                onChange={(e) =>
                                    handleIngredientInputChange(e, index)
                                }
                            />

                            <TextField
                                id="outlined-select-measurement"
                                label="Unit"
                                name="unit"
                                select
                                value={ingredient.unit}
                                onChange={(e) =>
                                    handleIngredientInputChange(e, index)
                                }
                                sx={{
                                    width: "max(10%, 125px)",
                                    "& .MuiInputBase-root *": {
                                        borderColor: theme.palette.primary.main,
                                        color: theme.palette.primary
                                            .contrastText,
                                    },
                                }}
                            >
                                {measurements.map((option) => (
                                    <MenuItem
                                        sx={{
                                            color: theme.palette.primary
                                                .contrastText,
                                        }}
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <FormControl
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    "& .MuiInputBase-root *": {
                                        borderColor: theme.palette.primary.main,
                                        color: theme.palette.primary
                                            .contrastText,
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        "&.Mui-focused fieldset": {
                                            borderColor:
                                                theme.palette.primary.main,
                                        },
                                    },

                                    width: "100%",
                                }}
                            >
                                <InputLabel htmlFor="ingredient">
                                    Ingredient
                                </InputLabel>
                                <OutlinedInput
                                    id="ingredient"
                                    label="Ingredient"
                                    name="ingredientName"
                                    type="text"
                                    value={ingredient.ingredientName}
                                    onChange={(e) =>
                                        handleIngredientInputChange(e, index)
                                    }
                                    sx={{
                                        width: "98%",
                                    }}
                                />
                            </FormControl>
                        </div>
                    );
                })}
            </article>

            {/* INSTRUCTIONS HERE */}
            <div
                style={{
                    display: "flex",
                    flexFlow: "row wrap",
                    width: "80%",
                    height: "40px",
                    alignItems: "center",
                    justifyContent: "space-around",
                }}
            >
                <Typography
                    sx={{
                        color: theme.palette.primary.contrastText,
                    }}
                    variant="h6"
                    component="h6"
                >
                    Instructions
                </Typography>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        margin: 1,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "1rem",
                            color: theme.palette.primary.contrastText,
                        }}
                        variant="h6"
                        component="h6"
                    >
                        Add a Step
                    </Typography>
                    <IconButton
                        aria-label="add instruction"
                        onClick={handleAddInstruction}
                        sx={{
                            scale: "1.25",
                            margin: "0 2.5%",
                            padding: "1",
                            m: 1,
                        }}
                    >
                        <AddBoxIcon
                            sx={{
                                color: theme.palette.success.light,
                            }}
                        />
                    </IconButton>
                </div>
            </div>
            <Box
                id="instructions-section"
                component={"article"}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "10px",
                    width: "80%",
                    maxHeight: "190px",
                    overflowY: "auto",
                    overflowX: "hidden",
                    margin: 1,
                    paddingTop: "5px",
                }}
            >
                {instructionList.map((instruction, index) => {
                    instruction.step = index + 1;
                    return (
                        <div
                            ref={
                                instructionList.length - 1 === index
                                    ? instructionRef
                                    : null
                            }
                            className="instruction"
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                            key={index}
                        >
                            <IconButton
                                sx={{
                                    scale: "1",
                                    margin: "0.5",
                                    padding: "1",
                                }}
                                aria-label="delete instruction"
                                onClick={() =>
                                    handleRemoveClick(instruction, index)
                                }
                            >
                                <RemoveCircleIcon
                                    sx={{
                                        color: theme.palette.error.light,
                                    }}
                                />
                            </IconButton>
                            <FormControl
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    "& .MuiInputBase-root *": {
                                        borderColor: theme.palette.primary.main,
                                        color: theme.palette.primary
                                            .contrastText,
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        "&.Mui-focused fieldset": {
                                            borderColor:
                                                theme.palette.primary.main,
                                        },
                                    },

                                    width: "100%",
                                }}
                            >
                                <InputLabel htmlFor="instruction">
                                    {`Step ${instruction.step}`}
                                </InputLabel>
                                <OutlinedInput
                                    sx={{
                                        width: "99%",
                                    }}
                                    id="instruction"
                                    type="text"
                                    label={`Step ${index + 1}`}
                                    value={instruction.instruction}
                                    onChange={(e) =>
                                        handleInstructionInputChange(e, index)
                                    }
                                />
                            </FormControl>
                        </div>
                    );
                })}
            </Box>
            <Button>Save Recipe</Button>
        </Box>
    );
}
