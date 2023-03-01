import { createContext, useContext, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { getEdamamRecipes, getMoreEdamamRecipes } from '../services/edamam-recipes.js';
import { useUser } from './UserContext.js';

const EdamamContext = createContext();

const EdamamProvider = ({ children }) => {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const [query, setQuery] = useState('');
  const [edamamRecipes, setEdamamRecipes] = useState([]);
  const [paging, setPaging] = useState({
    page: '1',
    nextPage_url: null,
  });

  const { setLoading } = useUser();

  // console.log(inView);

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

  useEffect(() => {
    const fetchMoreEdamamRecipes = async () => {
      try {
        setLoading(true);
        // console.log('edamamRecipes', edamamRecipes);
        const data = await getMoreEdamamRecipes(edamamRecipes._links.next.href);

        setPaging({
          page: paging.page++,
          nextPage_url: data._links.next.href,
        });

        setEdamamRecipes((prev) => {
          prev._links.next.href = data._links.next.href;
          return {
            ...prev,
            hits: [...prev.hits, ...data.hits],
          };
        });
      } catch (e) {
        console.error(e);
      }
    };
    if (inView) {
      fetchMoreEdamamRecipes();
      setLoading(false);
    }
  }, [paging.nextPage_url, paging.page, setLoading, edamamRecipes, inView]);

  return (
    <EdamamContext.Provider value={{ query, setQuery, edamamRecipes, ref, inView }}>
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
