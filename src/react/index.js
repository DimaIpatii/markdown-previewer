/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
// Clear DevTool [HMR] messages:
import { setLogLevel } from "webpack/hot/log";
setLogLevel("error");

// Sass:
import "../sass/main.scss";

//React:
import React from "react";
import ReactDOM from "react-dom";

import App from "./App.js";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);

module.hot.accept();
