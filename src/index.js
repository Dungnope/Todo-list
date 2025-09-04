import { createProject } from "./modules/CreateProject.js";
import { renderLocalStorage } from "./modules/renderData.js";
import { addWork } from "./modules/addWorkList.js";
const bar = document.querySelector(".navbar_item i");
const aSide = document.querySelector("aside");
//Show and hide sidebar
bar.addEventListener("click", (e) => {
  if (aSide.style.display === "none") {
    aSide.style.display = "block";
  } else if (aSide.style.display === "block" || aSide.style.display === "") {
    aSide.style.display = "none";
  }
});
renderLocalStorage();
createProject();
addWork();
