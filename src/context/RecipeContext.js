import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
    getNonSecretRecipes,
    getUserRecipes,
    insertRecipe,
} from "../services/recipes.js";
import { useUser } from "./UserContext.js";

const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
    const location = useLocation();
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
    const [nonSecretRecipes, setNonSecretRecipes] = useState([]);
    const [userRecipes, setUserRecipes] = useState([]);

    useEffect(() => {
        if (location.pathname === "/explore-recipes") {
            const fetchNonSecretRecipes = async () => {
                try {
                    setLoading(true);
                    const data = await getNonSecretRecipes();
                    setNonSecretRecipes(data);
                } catch (e) {
                    console.error(e);
                }
            };
            fetchNonSecretRecipes();
            setLoading(false);
        }
    }, [setLoading, location.pathname]);

    useEffect(() => {
        if (location.pathname === "/home") {
            const fetchUserRecipes = async () => {
                try {
                    setLoading(true);
                    const data = await getUserRecipes(user.id);
                    setUserRecipes(data);
                } catch (e) {
                    console.error(e);
                }
            };
            fetchUserRecipes();
            setLoading(false);
        }
    }, [setLoading, location.pathname, user]);

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
                userRecipes,
                nonSecretRecipes,
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
