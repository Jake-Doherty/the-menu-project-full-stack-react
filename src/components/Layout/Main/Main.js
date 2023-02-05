import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useUser } from "../../../context/UserContext.js";
import Auth from "../../Pages/Auth/Auth.js";
import Home from "../../Pages/Home/Home.js";
import RecipeForm from "../../Pages/Recipes/RecipeForm/RecipeForm.js";

export default function Main() {
    const { user } = useUser();
    return (
        <main
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Routes>
                <Route path="/auth/:type" element={<Auth />} />
                <Route path="/home" element={<Home />} />
                <Route path="/recipe-editor" element={<RecipeForm />} />
                <Route
                    path="/"
                    element={user ? <Home /> : <Navigate to="/auth/sign-in" />}
                />
            </Routes>
        </main>
    );
}
