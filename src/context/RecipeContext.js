import { createContext, useContext, useState } from "react";
import { insertRecipe } from "../services/recipes.js";
import { useUser } from "./UserContext.js";

const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
    const { user, setLoading } = useUser();
    const [dishName, setDishName] = useState("");
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
    const [notes, setNotes] = useState("");

    const [open, setOpen] = useState(false);

    const handleSaveRecipe = async () => {
        console.log("save recipe");
        try {
            setLoading(true);
            await insertRecipe(user.id, {
                dishName: dishName,
                ingredients: ingredientList,
                instructions: instructionList,
                notes: notes,
            });
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
