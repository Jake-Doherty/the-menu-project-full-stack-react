import { createContext, useContext, useState } from "react";
import { insertRecipe } from "../services/recipes.js";
import { useUser } from "./UserContext.js";

const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
    const { user, setLoading } = useUser();
    const [dishName, setDishName] = useState("");
    const initialIngredientList = [
        {
            unit: "",
            quantity: "",
            ingredientName: "",
        },
    ];
    const [ingredientList, setIngredientList] = useState(initialIngredientList);
    const initialInstructionList = [
        {
            step: "",
            instruction: "",
        },
    ];
    const [instructionList, setInstructionList] = useState(
        initialInstructionList
    );
    const [notes, setNotes] = useState("");

    const [open, setOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const handleSaveRecipe = async () => {
        try {
            setLoading(true);
            const { data, error } = await insertRecipe(user.id, {
                dishName: dishName,
                ingredients: ingredientList,
                instructions: instructionList,
                notes: notes,
            });

            if (data) {
                setDishName("");
                setIngredientList(initialIngredientList);
                setInstructionList(initialInstructionList);
                setNotes("");
            }

            error
                ? setSnackbarSeverity("error")
                : setSnackbarSeverity("success");
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
        setOpen(true);
    };

    return (
        <RecipeContext.Provider
            value={{
                open,
                setOpen,
                snackbarSeverity,
                setDishName,
                setIngredientList,
                setInstructionList,
                ingredientList,
                instructionList,
                setNotes,
                dishName,
                notes,
                handleSaveRecipe,
            }}
        >
            {children}
        </RecipeContext.Provider>
    );
};

const useRecipe = () => {
    const data = useContext(RecipeContext);

    if (!data) {
        throw new Error("useRecipe must be wrapped in a RecipeProvider");
    }
    return data;
};

export { RecipeProvider, useRecipe };
