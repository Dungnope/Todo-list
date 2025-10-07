import './styles.css';
import { renderLocalStorage } from './modules/renderData.js';
import { createProject } from './modules/createProject.js';
import { asideList } from './modules/asideProject.js';
import defaultData from "./modules/localStorage_backup.json";
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

window.addEventListener("DOMContentLoaded", () => {
  if(!localStorage.getItem("todo")){
    new Promise((resolve) => {
      resolve(defaultData)
    })
    .then(data => {
      localStorage.setItem(Object.keys(data)[0], Object.values(data)[0]);
      localStorage.setItem(Object.keys(data)[1], Object.values(data)[1]);
      localStorage.setItem(Object.keys(data)[2], Object.values(data)[2]);
      localStorage.setItem(Object.keys(data)[3], Object.values(data)[3]);
      localStorage.setItem(Object.keys(data)[4], Object.values(data)[4]);
      renderLocalStorage();
    })
  }
})
console.log(renderLocalStorage);
renderLocalStorage();
createProject();
asideList();
