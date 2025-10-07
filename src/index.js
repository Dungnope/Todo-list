import './styles.css';
import { renderLocalStorage } from './modules/renderData.js';
import { createProject } from './modules/createProject.js';
import { asideList } from './modules/asideProject.js';
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
asideList();
