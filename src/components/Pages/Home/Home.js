import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../../context/UserContext.js";
import { useTheme as useMuiTheme } from "@emotion/react";

export default function Home() {
    const { user } = useUser();

    const theme = useMuiTheme();

    if (!user) {
        return <Navigate to="/auth/sign-in" />;
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            <h1 style={{ color: theme.palette.primary.contrastText }}>
                Temp Welcome Message
            </h1>
        </div>
    );
}
