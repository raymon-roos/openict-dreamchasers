import { createHeader } from "../../components/headerComponent.js";
import { renderOverviewCard } from "../../components/overviewCard.js";
import { displayCustomerInfo } from "./scripts/displayInfo.js";

// Add header component to the DOM
const container = document.querySelector(".container");
const header = createHeader();
container.insertBefore(header, container.querySelector(".mainContainer"));

displayCustomerInfo();

// Initial Render OverviewCard
renderOverviewCard("overviewCard");
