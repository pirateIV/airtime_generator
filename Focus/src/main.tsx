import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider>
      <App />
    </RouterProvider>
  </StrictMode>
);
