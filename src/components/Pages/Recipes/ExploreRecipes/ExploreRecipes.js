import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../../../context/UserContext.js";
import { useTheme as MuiTheme } from "@emotion/react";

import { Box } from "@mui/material/";

export default function ExploreRecipes() {
    const { user } = useUser();
    const theme = MuiTheme();

    if (!user) {
        return <Navigate to="/auth/sign-in" />;
    }

    return (
        <Box
            border={2}
            borderRadius={2}
            borderColor={theme.palette.primary.main}
            p={5}
            gap={2}
            sx={{
                width: "max(275px, 35vw)",
                minHeight: "max(calc(100vh - 800px), 400px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
            }}
        >
            ExploreRecipes
        </Box>
    );
}
