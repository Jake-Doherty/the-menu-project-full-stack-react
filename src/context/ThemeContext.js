import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext.js";
import { ThemeProvider } from "@mui/system/";
import { createTheme } from "@mui/material/styles";

const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
    const lightTheme = createTheme({
        palette: {
            mode: "light",
            primary: {
                main: "#5893df",
                light: "rgba(121, 168, 229, 0.45)",
                dark: "rgb(61, 102, 156)",
                contrastText: "#0B1E38",
            },
            secondary: {
                main: "#2ec5d3",
                light: "rgb(87, 208, 219)",
                dark: "rgb(32, 137, 147)",
                contrastText: "rgba(0, 0, 0, 0.87)",
            },
            background: {
                default: "#F7F7F7",
                paper: "#FCFCFC",
            },
            text: {
                primary: "rgba(255, 255, 255, 0.87)",
                secondary: "rgba(0, 0, 0, 0.6)",
                disabled: "rgba(0, 0, 0, 0.38)",
            },
            error: {
                main: "#d32f2f",
                light: "#ef5350",
                dark: "#c62828",
                contrastText: "#fff",
            },
            warning: {
                main: "#ed6c02",
                light: "#ff9800",
                dark: "#e65100",
                contrastText: "#fff",
            },
            info: {
                main: "#0288d1",
                light: "#03a9f4",
                dark: "#01579b",
                contrastText: "#fff",
            },
            success: {
                main: "#2e7d32",
                light: "#4caf50",
                dark: "#1b5e20",
                contrastText: "#fff",
            },
            divider: "rgba(0, 0, 0, 0.12)",
        },
    });

    const darkTheme = createTheme({
        palette: {
            mode: "dark",
            primary: {
                main: "#5893df",
                light: "rgb(121, 168, 229)",
                dark: "rgb(61, 102, 156)",
                contrastText: "#fff",
            },
            secondary: {
                main: "#2ec5d3",
                light: "rgb(87, 208, 219)",
                dark: "rgb(32, 137, 147)",
                contrastText: "rgba(0, 0, 0, 0.87)",
            },
            background: {
                default: "#192231",
                paper: "#24344d",
            },
            text: {
                primary: "#fff",
                secondary: "rgba(255, 255, 255, 0.7)",
                disabled: "rgba(255, 255, 255, 0.5)",
            },
            error: {
                main: "#f44336",
                light: "#e57373",
                dark: "#d32f2f",
                contrastText: "#fff",
            },
            warning: {
                main: "#ffa726",
                light: "#ffb74d",
                dark: "#f57c00",
                contrastText: "rgba(0, 0, 0, 0.87)",
            },
            info: {
                main: "#29b6f6",
                light: "#4fc3f7",
                dark: "#0288d1",
                contrastText: "rgba(0, 0, 0, 0.87)",
            },
            success: {
                main: "#66bb6a",
                light: "#81c784",
                dark: "#388e3c",
                contrastText: "rgba(0, 0, 0, 0.87)",
            },
            divider: "rgba(255, 255, 255, 0.12)",
        },
    });
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
    }, [profile, themeInput]);

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
