import { createHeader } from "./scripts/headerComponent";

// Add header component to the DOM
const container = document.querySelector(".container");
const header = createHeader();
container.insertBefore(header, container.querySelector(".mainContainer"));
