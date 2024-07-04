import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const appDiv = document.getElementById("app");
if (appDiv) createRoot(appDiv).render(<App />);
