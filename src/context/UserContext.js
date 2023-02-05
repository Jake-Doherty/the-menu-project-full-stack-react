const { createContext, useState, useContext } = require("react");
const { getUser } = require("../services/auth");

// TODO -- create the user provider!
const UserContext = createContext();

const UserProvider = ({ children }) => {
    const currentUser = getUser();
    const [user, setUser] = useState(currentUser);

    return (
        <UserContext.Provider value={{ user, setUser }}>
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
