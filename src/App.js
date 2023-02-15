import { useTheme } from "@emotion/react";
import "./App.css";
import Main from "./components/Layout/Main/Main.js";
import Nav from "./components/Layout/Nav/Nav.js";

function App() {
    const theme = useTheme();
    return (
        <div
            style={{
                overflowX: "hidden",
                backgroundColor: theme.palette.background.default,
            }}
            className="App"
        >
            <Nav />
            <Main />
        </div>
    );
}

export default App;
