import { generateDataFromKey } from "./saveData.js";
import { renderLocalStorage } from "./renderData.js";
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
    todoTitle.value = "";
    renderLocalStorage();
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
      todoTitle.value = "";
      modal.close();
    }
  });
};

export { createProject };
