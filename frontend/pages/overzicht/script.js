import { createHeader } from "../../components/headerComponent.js";
import { renderOverviewCard } from "../../components/overviewCard.js";

// Add header component to the DOM
const container = document.querySelector(".container");
const header = createHeader();
container.insertBefore(header, container.querySelector(".mainContainer"));

// Initial Render OverviewCard
renderOverviewCard("overviewCard");
