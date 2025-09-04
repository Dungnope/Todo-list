import { generateDataFromKey } from "./saveData.js";
import { renderLocalStorage } from "./renderData.js";
import { addWork } from "./addWorkList.js";
const createProject = () => {
  const modal = document.querySelector("[data-modal]");
  const createModalBtn = document.querySelector("[data-close-modal]");
  const todoTitle = document.querySelector("#todoTitle");
  const createProjectbtn = document.querySelector("aside .btn");
  createProjectbtn.addEventListener("click", () => {
    modal.showModal();
  });

  createModalBtn.addEventListener("click", (e) => {
    generateDataFromKey(todoTitle.value);
    renderLocalStorage();
    todoTitle.value = "";
    addWork();
    modal.close();
  });

  modal.addEventListener("click", (e) => {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      modal.close();
    }
  });
};

export { createProject };
