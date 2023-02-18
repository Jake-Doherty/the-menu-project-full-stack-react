import { Typography } from "@mui/material";
import React from "react";
import AddButton from "./AddButton.js";

export default function InstructionsHeader({ theme, handleAddInstruction }) {
    return (
        <div
            style={{
                display: "flex",
                flexFlow: "row wrap",
                width: "80%",
                height: "40px",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: `2px solid ${theme.palette.primary.main}`,
            }}
        >
            <Typography
                sx={{
                    color: theme.palette.primary.contrastText,
                }}
                variant="h6"
                component="h6"
            >
                Instructions
            </Typography>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    margin: 1,
                }}
            >
                <Typography
                    sx={{
                        fontSize: "0.8rem",
                        color: theme.palette.primary.contrastText,
                        width: "150px",
                        textAlign: "center",
                    }}
                    variant="h6"
                    component="h6"
                >
                    Add a Step
                </Typography>
                <AddButton {...{ theme, handleAddInstruction }} />
            </div>
        </div>
    );
}
