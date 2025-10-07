import { addWork } from "./addWorkList.js";
import { renderLocalStorage } from "./renderData.js";

const deleteCard = () => {
  const bicycleBtn = document.querySelectorAll(".todo_edit .todo_trash");
  const card = document.querySelectorAll(".todo_cards .todo_card");
  bicycleBtn.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      e.stopImmediatePropagation();
      const cardName = card[index].firstChild.firstChild.textContent;
      const Data = localStorage.getItem("todo");
      const todoCards = document.querySelector(".todo_section .todo_cards");
      const takeCardId = e.currentTarget.parentNode.parentNode.parentNode;
      if (Data && todoCards.hasChildNodes()) {
        const dataArr = JSON.parse(Data);
        const filterList = dataArr.filter((value) => value.name != cardName);
        localStorage.setItem("todo", JSON.stringify(filterList));
        localStorage.removeItem(cardName);
        todoCards.removeChild(takeCardId);
        renderLocalStorage();
      }
    });
  });
};

const ChangeNameCard = () => {
  const renameBtn = document.querySelectorAll(".todo_edit .todo_change");
  const renameForm = document.querySelector("[data-edit]");
  const inputChange = document.querySelector("#changeTitle");
  const changeSubmitBtn = document.querySelector("[data-edit-modal]");
  const discardBtn = document.querySelector("[data-edit-box] span");
  let oldname;
  renameBtn.forEach((button) => {
    button.addEventListener("click", (e) => {
      oldname = e.currentTarget.parentNode.previousSibling.textContent;
      renameForm.showModal();
    });
  });

  changeSubmitBtn.addEventListener("click", (e2) => {
    const getnameFirst = new Promise((relsolve) => {
      relsolve(inputChange.value);
    });
    getnameFirst.then((newname) => {
      changeDataCard(oldname, newname);
    });
  });

  discardBtn.addEventListener("click", (e3) => {
    renameForm.close();
  });
};

const changeDataCard = (oldname, newname) => {
  console.log(oldname, newname);
  const currentData = localStorage.getItem("todo");
  const currentDataArr = JSON.parse(currentData);
  const oldData = localStorage.getItem(oldname);
  const newData = currentDataArr.map((item) => {
    if (item.name === oldname) {
      item.name = newname;
    }
    return item;
  });
  console.log(currentData);
  console.log(newData);
  if (oldData) {
    localStorage.setItem(newname, oldData);
    localStorage.removeItem(oldname);
  }
  localStorage.setItem("todo", JSON.stringify(newData));
  if (oldname !== newname) {
    renderLocalStorage();
  }
};

export { deleteCard, ChangeNameCard };
