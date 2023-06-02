import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
// import { useUser } from '../context/UserContext.js';

export default function useToken() {
  const [token, setToken] = useState(null);

  // const { user } = useUser();

  useEffect(() => {
    const authToken = Cookies.get('session');
    setToken(authToken);
    console.log(token);
  }, [token]);

  // useEffect(() => {
  //   if (!user) {
  //     Cookies.remove('session');
  //   }
  // }, [user, token]);

  return { token, setToken };
}
