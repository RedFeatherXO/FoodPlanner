import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import { GlobalStateProvider} from './context/GlobalStateContext.js';
import PasswordProtect from "./components/PasswordProtect";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PasswordProtect>
    <GlobalStateProvider>
      <App />
    </GlobalStateProvider>
  </PasswordProtect>
);
