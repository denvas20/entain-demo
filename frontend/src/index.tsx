import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store";

const appDiv = document.getElementById("app");
if (appDiv)
    createRoot(appDiv).render(
        <Provider store={store}>
            <App />
        </Provider>
    );
