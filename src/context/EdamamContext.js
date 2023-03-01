import { createContext, useContext, useEffect, useState } from 'react';
import { getEdamamRecipes } from '../services/edamam-recipes.js';
import { useUser } from './UserContext.js';

const EdamamContext = createContext();

const EdamamProvider = ({ children }) => {
  const [query, setQuery] = useState('');
  const [edamamRecipes, setEdamamRecipes] = useState([]);

  const { setLoading } = useUser();

  useEffect(() => {
    const fetchEdamamRecipes = async () => {
      try {
        setLoading(true);
        const data = await getEdamamRecipes(query);
        setEdamamRecipes(data);
      } catch (e) {
        console.error(e);
      }
    };
    query ? fetchEdamamRecipes() : null;
    setLoading(false);
  }, [query, setLoading]);

  return (
    <EdamamContext.Provider value={{ query, setQuery, edamamRecipes }}>
      {children}
    </EdamamContext.Provider>
  );
};

const useEdamam = () => {
  const data = useContext(EdamamContext);

  if (!data) {
    throw new Error('useEdamam must be used within a EdamamProvider');
  }

  return data;
};

export { EdamamProvider, useEdamam };
