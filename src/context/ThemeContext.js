import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext.js";
import { ThemeProvider } from "@mui/system/";
import useCustomThemes from "../hooks/useCustomThemes.js";

const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
    const { darkTheme, lightTheme } = useCustomThemes();
    const { profile, themeInput, setThemeInput } = useUser();
    const [userTheme, setUserTheme] = useState(darkTheme);

    useEffect(() => {
        if (profile) {
            if (themeInput) {
                setUserTheme(darkTheme);
            }
            if (!themeInput) {
                setUserTheme(lightTheme);
            }
        }
    }, [profile, themeInput, darkTheme, lightTheme]);

    const toggleTheme = () => {
        setUserTheme((prevTheme) =>
            prevTheme === lightTheme ? darkTheme : lightTheme
        );
        setThemeInput((prevTheme) => !prevTheme);
    };

    return (
        <ThemeProvider theme={userTheme}>
            <ThemeContext.Provider value={{ toggleTheme }}>
                {children}
            </ThemeContext.Provider>
        </ThemeProvider>
    );
};

const useTheme = () => {
    const data = useContext(ThemeContext);

    if (!data) {
        throw new Error("useTheme must be wrapped in a ThemeProvider");
    }
    return data;
};

export { ThemeContextProvider, useTheme };
