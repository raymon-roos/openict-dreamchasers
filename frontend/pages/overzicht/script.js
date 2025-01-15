import { createHeader } from "../../components/headerComponent.js";

// Add header component to the DOM
const container = document.querySelector(".container");
const header = createHeader();
container.insertBefore(header, container.querySelector(".mainContainer"));
