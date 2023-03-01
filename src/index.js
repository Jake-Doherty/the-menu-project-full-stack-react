import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './context/UserContext.js';
import { BrowserRouter } from 'react-router-dom';
// import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { ThemeContextProvider } from './context/ThemeContext.js';
import { RecipeProvider } from './context/RecipeContext.js';
import { EdamamProvider } from './context/EdamamContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <CssVarsProvider> */}
      <UserProvider>
        <ThemeContextProvider>
          <EdamamProvider>
            <RecipeProvider>
              <App />
            </RecipeProvider>
          </EdamamProvider>
        </ThemeContextProvider>
      </UserProvider>
      {/* </CssVarsProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
