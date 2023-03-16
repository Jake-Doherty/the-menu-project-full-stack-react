import { useRef } from 'react';
// import { useUser } from '../context/UserContext.js';
// import { insertRecipe } from '../services/recipes.js';

export default function useRecipeFormFunctions({
  dishName,
  setDishName,
  ingredientList,
  setIngredientList,
  instructionList,
  setInstructionList,
  notes,
  setNotes,
  tags,
  setTags,
  servings,
  setServings,
  totalTime,
  setTotalTime,
  hoursInput,
  setHoursInput,
  minutesInput,
  setMinutesInput,
  isSecret,
  setIsSecret,
}) {
  const ingredientRef = useRef(null);
  const instructionRef = useRef(null);

  // const { user } = useUser();

  const handleDishNameChange = (e) => {
    setDishName(e.target.value);
  };

  const handleIngredientInputChange = (e, index) => {
    const { name, value } = e.target;

    if (name === 'ingredientName') {
      const list = [...ingredientList];
      list[index].ingredientName = value;

      setIngredientList(list);
    }

    if (name === 'qty') {
      const list = [...ingredientList];
      list[index].quantity = value;

      setIngredientList(list);
    }

    if (name === 'unit') {
      const list = [...ingredientList];
      list[index].unit = value;

      setIngredientList(list);
    }
  };

  const handleInstructionInputChange = (e, index) => {
    const { value } = e.target;

    const list = [...instructionList];
    list[index].instruction = value;

    setInstructionList(list);
  };

  const handleAddIngredient = () => {
    setIngredientList([
      ...ingredientList,
      {
        unit: '',
        quantity: '',
        ingredientName: '',
      },
    ]);
    setTimeout(() => {
      ingredientRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }, 50);
  };

  const handleAddInstruction = () => {
    setInstructionList([
      ...instructionList,
      {
        step: '',
        instruction: '',
      },
    ]);
    setTimeout(() => {
      instructionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }, 50);
  };

  const handleNoteInputChange = (e) => {
    setNotes(e.target.value);
  };

  const handleAddAttribute = (e) => {
    const { name, value } = e.target;

    if (name === 'tags') {
      setTags(value);
    }

    if (name === 'servings') {
      setServings(value);
    }

    if (name === 'hours') {
      setHoursInput(value);
    }

    if (name === 'minutes') {
      setMinutesInput(value);
    }

    let hoursToMinutes = hoursInput * 60;

    const summedTime = (hoursToMinutes += minutesInput);

    setTotalTime(summedTime);

    if (name === 'secret') {
      setIsSecret(!isSecret);
    }
  };

  const handleRemoveClick = (obj, index) => {
    if (Object.keys(obj)[0] === 'unit') {
      const list = [...ingredientList];
      list.splice(index, 1);

      setIngredientList(list);
    }

    if (Object.keys(obj)[0] === 'step') {
      const list = [...instructionList];
      list.splice(index, 1);
      setInstructionList(list);
    }
  };

  // const handleSaveRecipe = async () => {
  //   try {
  //     await insertRecipe(user.id, {
  //       dishName: dishName,
  //       ingredients: ingredientList,
  //       instructions: instructionList,
  //       notes: notes,
  //       tags: tags,
  //     });
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  return {
    dishName,
    ingredientList,
    instructionList,
    notes,
    tags,
    servings,
    totalTime,
    isSecret,
    ingredientRef,
    instructionRef,
    handleDishNameChange,
    handleIngredientInputChange,
    handleAddIngredient,
    handleInstructionInputChange,
    handleAddInstruction,
    handleNoteInputChange,
    handleAddAttribute,
    handleRemoveClick,
    // handleSaveRecipe,
  };
}
