import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../../context/UserContext.js";

export default function Home() {
    const { user } = useUser();

    if (!user) {
        return <Navigate to="/auth/sign-in" />;
    }

    return <div>Home</div>;
}
