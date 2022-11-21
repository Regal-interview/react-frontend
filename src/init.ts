import React, { createElement } from "react";
import { createRoot } from "react-dom/client";
import "../css/app.css";
import App from "./App";

class Init extends HTMLElement {
  connectedCallback() {
    createRoot(this).render(createElement(App));
  }
}

customElements.define("regal-init", Init, { extends: "main" });
