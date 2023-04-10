import {
  // getProfile,
  insertProfile,
  updateProfile,
  // uploadImage,
} from '../services/profile.js';

const { createContext, useState, useContext, useEffect } = require('react');
const { getUser } = require('../services/auth-fetch-utils.js');

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const currentUser = await getUser();
      setUser(currentUser);
    };
    fetchUser();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const [profile, setProfile] = useState(undefined);
  const [profileAvatarInput, setProfileAvatarInput] = useState('');
  const [
    profileAvatarUrl,
    // setProfileAvatarUrl
  ] = useState('');
  const [themeInput, setThemeInput] = useState(
    profile && profile.dark_mode ? profile.dark_mode : true
  );

  // useEffect(() => {
  //   if (user) {
  //     const fetchUserProfile = async () => {
  //       try {
  //         setLoading(true);
  //         const data = await getProfile(user.id, profile);
  //         setProfile(data);
  //       } catch (e) {
  //         console.error(e.message);
  //       }
  //     };
  //     fetchUserProfile();
  //     if (profile) {
  //       setThemeInput(profile.dark_mode);
  //     }
  //     setLoading(false);
  //   }
  // }, [user, profile]);

  // useEffect(() => {
  //   const uploadAvatarImage = async () => {
  //     if (!profileAvatarInput) return;
  //     try {
  //       setLoading(true);
  //       const imageFile = profileAvatarInput;

  //       const randomFolder = Math.floor(Date.now() * Math.random());
  //       const imagePath = `profile-avatars/${randomFolder}/${imageFile.name}`;

  //       const url = await uploadImage('profile-avatars', imagePath, imageFile);
  //       setProfileAvatarUrl(url);
  //     } catch (e) {
  //       console.error(e.message);
  //     }
  //   };
  //   uploadAvatarImage();
  //   setLoading(false);
  // }, [profileAvatarInput]);

  const handleProfileChange = async ({ username, bio, darkMode }) => {
    if (!profile) {
      console.info('no profile, inserting');
      const fetchInsertProfile = async () => {
        try {
          setLoading(true);
          const resp = await insertProfile(user.id, {
            username,
            bio,
            profileAvatar: profileAvatarUrl,
            darkMode,
          });
          setProfile(resp);
        } catch (e) {
          console.error(e.message);
        }
      };
      fetchInsertProfile();
      setLoading(false);
    }

    if (profile) {
      console.info('profile exists, updating');
      const fetchUpdateProfile = async () => {
        try {
          setLoading(true);
          const resp = await updateProfile(user.id, {
            username,
            bio,
            profileAvatar: profileAvatarUrl,
            darkMode,
          });
          setProfile(resp);
        } catch (e) {
          console.error(e.message);
        }
      };
      fetchUpdateProfile();
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        loading,
        setLoading,
        user,
        setUser,
        profile,
        setProfile,
        handleProfileChange,
        profileAvatarInput,
        setProfileAvatarInput,
        profileAvatarUrl,
        themeInput,
        setThemeInput,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const data = useContext(UserContext);

  if (!data) {
    throw new Error('useUser must be wrapped in a UserProvider');
  }
  return data;
};

export { UserProvider, useUser };
