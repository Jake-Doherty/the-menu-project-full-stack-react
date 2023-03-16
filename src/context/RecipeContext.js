import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getNonSecretRecipes, getUserRecipes, insertRecipe } from '../services/recipes.js';
import { useUser } from './UserContext.js';

const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
  const location = useLocation();
  const { user, setLoading } = useUser();

  // recipe form state
  const [dishName, setDishName] = useState('');
  const initialIngredientList = [
    {
      unit: '',
      quantity: '',
      ingredientName: '',
    },
  ];
  const [ingredientList, setIngredientList] = useState(initialIngredientList);
  const initialInstructionList = [
    {
      step: '',
      instruction: '',
    },
  ];
  const [instructionList, setInstructionList] = useState(initialInstructionList);
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState([]);
  const [servings, setServings] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [hoursInput, setHoursInput] = useState('');
  const [minutesInput, setMinutesInput] = useState('');
  const [isSecret, setIsSecret] = useState(true);

  // snackbar state
  const [open, setOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // recipe list state
  const [nonSecretRecipes, setNonSecretRecipes] = useState([]);
  const [userRecipes, setUserRecipes] = useState([]);

  // explore recipes query state
  const [query, setQuery] = useState('');

  // recipe modal state
  const [expanded, setExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDishName, setModalDishName] = useState('');
  const [modalIngredientList, setModalIngredientList] = useState([]);
  const [modalInstructionList, setModalInstructionList] = useState([]);
  const [modalNotes, setModalNotes] = useState('');
  const [modalServings, setModalServings] = useState('');
  const [modalTotalTime, setModalTotalTime] = useState('');

  // my recipes search state
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    if (location.pathname === '/explore-recipes') {
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
    if (location.pathname === '/home') {
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

  const handleSaveRecipe = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data, error } = await insertRecipe(user.id, {
        dishName: dishName,
        ingredients: ingredientList,
        instructions: instructionList,
        notes: notes,
        tags: tags,
        servings: servings,
        totalTime: totalTime,
        isSecret: isSecret,
      });

      if (data) {
        setDishName('');
        setIngredientList(initialIngredientList);
        setInstructionList(initialInstructionList);
        setNotes('');
        setTags([]);
        setServings(0);
        setTotalTime(0);
        setHoursInput('');
        setMinutesInput('');
        setIsSecret(false);
      }

      error ? setSnackbarSeverity('error') : setSnackbarSeverity('success');
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
        snackbarSeverity,
        handleSaveRecipe,
        open,
        setOpen,
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
        query,
        setQuery,
        expanded,
        setExpanded,
        modalOpen,
        setModalOpen,
        modalDishName,
        setModalDishName,
        modalIngredientList,
        setModalIngredientList,
        modalInstructionList,
        setModalInstructionList,
        modalNotes,
        setModalNotes,
        modalServings,
        setModalServings,
        modalTotalTime,
        setModalTotalTime,
        searchInput,
        setSearchInput,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

const useRecipe = () => {
  const data = useContext(RecipeContext);

  if (!data) {
    throw new Error('useRecipe must be wrapped in a RecipeProvider');
  }
  return data;
};

export { RecipeProvider, useRecipe };
