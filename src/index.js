import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/App";
import { AppStyled } from "./components/app/AppStyled";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <AppStyled>
      <App />
    </AppStyled>
  </React.StrictMode>,
  document.getElementById("root")
);
