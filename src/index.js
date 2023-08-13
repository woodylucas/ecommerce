import React from "react";
import { createRoot } from "react-dom/client";

import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const el = document.getElementById("root");
const root = createRoot(el);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
