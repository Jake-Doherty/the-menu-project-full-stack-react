import { useState, useRef } from "react";
import { useUser } from "../context/UserContext.js";
import { insertRecipe } from "../services/recipes.js";

export default function useRecipeFormFunctions() {
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

    const ingredientRef = useRef(null);
    const instructionRef = useRef(null);

    const { user } = useUser();

    const handleDishNameChange = (e) => {
        setDishName(e.target.value);
    };

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

    const handleSaveRecipe = async () => {
        console.log("save recipe");
        try {
            const data = await insertRecipe(user.id, {
                dishName: dishName,
                ingredients: ingredientList,
                instructions: instructionList,
            });
            console.log(data);
        } catch (e) {
            console.error(e);
        }
    };

    return {
        dishName,
        ingredientList,
        instructionList,
        ingredientRef,
        instructionRef,
        handleDishNameChange,
        handleIngredientInputChange,
        handleInstructionInputChange,
        handleAddIngredient,
        handleAddInstruction,
        handleRemoveClick,
        handleSaveRecipe,
    };
}
