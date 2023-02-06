import { getProfile, updateProfile } from "../services/profile.js";

const { createContext, useState, useContext, useEffect } = require("react");
const { getUser } = require("../services/auth");

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const currentUser = getUser();
    const [user, setUser] = useState(currentUser);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (!user || !profile) {
            return;
        }

        if (user) {
            const fetchUserProfile = async () => {
                try {
                    const data = await getProfile(user.id);
                    setProfile(data);
                } catch (e) {
                    console.error(e.message);
                }
            };
            fetchUserProfile();
        }
    }, [user, profile]);

    useEffect(() => {
        if (!user || !profile) {
            return;
        }
        const fetchUpdateProfile = async () => {
            try {
                console.log("profile", profile);
                await updateProfile(user.id, profile);
            } catch (e) {
                console.error(e.message);
            }
        };
        fetchUpdateProfile();
    }, [user, profile]);

    return (
        <UserContext.Provider value={{ user, setUser, profile, setProfile }}>
            {children}
        </UserContext.Provider>
    );
};

const useUser = () => {
    const data = useContext(UserContext);

    if (!data) {
        throw new Error("useUser must be wrapped in a UserProvider");
    }
    return data;
};

export { UserProvider, useUser };
