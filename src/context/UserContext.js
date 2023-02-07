import {
    getProfile,
    insertProfile,
    updateProfile,
} from "../services/profile.js";

const { createContext, useState, useContext, useEffect } = require("react");
const { getUser } = require("../services/auth");

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const currentUser = getUser();
    const [user, setUser] = useState(currentUser);
    const [profile, setProfile] = useState({});

    useEffect(() => {
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
    }, [user]);
    console.log("user", profile);

    const handleProfileChange = (props) => {
        console.log("handleProfileChange", profile);

        if (!profile) {
            const fetchInsertProfile = async () => {
                try {
                    console.log("in the fetchUpdateProfile", profile);
                    const resp = await insertProfile(user.id, props);
                    console.log("resp", resp);
                } catch (e) {
                    console.error(e.message);
                }
            };
            fetchInsertProfile();
        }
        if (profile) {
            const fetchUpdateProfile = async () => {
                try {
                    const resp = await updateProfile(user.id, props);
                    setProfile(resp);
                } catch (e) {
                    console.error(e.message);
                }
            };
            fetchUpdateProfile();
        }
    };

    return (
        <UserContext.Provider
            value={{ user, setUser, profile, setProfile, handleProfileChange }}
        >
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
