import { renderLocalStorage } from "./renderData.js";

const deleteCard = () => {
  const bicycleBtn = document.querySelectorAll(".todo_edit .todo_trash");
  const card = document.querySelectorAll(".todo_cards .todo_card");
  bicycleBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopImmediatePropagation();
      const cardName =
        e.currentTarget.parentNode.parentNode.parentNode.getAttribute(
          "name-card",
        );
      const Data = localStorage.getItem("todo");
      const todoCards = document.querySelector(".todo_section .todo_cards");
      const takeCardId =
        e.currentTarget.parentNode.parentNode.parentNode.getAttribute("id");
      if (Data && todoCards.hasChildNodes()) {
        const dataArr = JSON.parse(Data);
        const filterList = dataArr.filter((value) => value.id !== takeCardId);
        localStorage.setItem("todo", JSON.stringify(filterList));
        localStorage.removeItem(`[${cardName}, ${takeCardId}]`);
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
  let oldname, cardID;
  renameBtn.forEach((button, idx) => {
    button.addEventListener("click", (e) => {
      oldname = e.currentTarget.parentNode.previousSibling.textContent;
      renameForm.showModal();
      cardID =
        renameBtn[idx].parentNode.parentNode.parentNode.getAttribute("id");
    });
  });

  changeSubmitBtn.addEventListener("click", (e2) => {
    const getnameFirst = new Promise((relsolve) => {
      relsolve(inputChange.value);
    });
    getnameFirst.then((newname) => {
      changeDataCard(oldname, newname, cardID);
    });
  });

  discardBtn.addEventListener("click", (e3) => {
    renameForm.close();
  });
};

const changeDataCard = (oldname, newname, cardid) => {
  const currentData = localStorage.getItem("todo");
  const currentDataArr = JSON.parse(currentData);
  const oldData = localStorage.getItem(`[${oldname}, ${cardid}]`);
  const newData = currentDataArr.map((item) => {
    if (item.name === oldname && item.id === cardid) {
      item.name = newname;
    }
    return item;
  });
  if (oldData) {
    localStorage.setItem(`[${newname}, ${cardid}]`, oldData);
    localStorage.removeItem(`[${oldname}, ${cardid}]`);
  }
  localStorage.setItem("todo", JSON.stringify(newData));
  if (oldname !== newname) {
    renderLocalStorage();
  }
};

export { deleteCard, ChangeNameCard };
