import { renderLocalStorage } from './renderData.js';
import { createProject } from './createProject.js';
const bar = document.querySelector(".navbar_item i");
const aSide = document.querySelector("aside");
const todoCard = document.querySelectorAll(".todo_cards .todo_card");
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
