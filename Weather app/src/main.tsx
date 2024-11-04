import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import store from "./app/store.ts";
import App from "./App.tsx";
import "./index.css";

console.log(store.getState());

createRoot(document.getElementById("__root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
