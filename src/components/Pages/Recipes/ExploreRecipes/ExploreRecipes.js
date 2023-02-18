import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../../../context/UserContext.js";

import { Box } from "@mui/material/";

export default function ExploreRecipes() {
    const { user } = useUser();

    if (!user) {
        return <Navigate to="/auth/sign-in" />;
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                width: "100%",
                height: "100%",
            }}
        >
            ExploreRecipes
        </Box>
    );
}
