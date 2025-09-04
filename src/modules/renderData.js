import { addWork, addList, takeListUI } from "./addWorkList.js";
import { createEmptyCard } from "./createEmptyCard.js";
const renderLocalStorage = () => {
  const todoListStr = localStorage.getItem("todo");
  if (todoListStr) {
    const todoList = JSON.parse(todoListStr);
    const todoCards = document.querySelector(".todo_section .todo_cards");
    todoCards.innerHTML = "";
    if (todoList && todoList.length) {
      todoList.forEach((item, idx) => {
        //list item
        const newCard = createEmptyCard(item.name, idx);
        todoCards.appendChild(newCard);
        const todoItemStr = localStorage.getItem(`${item.name}`);
        if (todoItemStr) {
          const todoItemList = JSON.parse(todoItemStr);

          if (todoItemList && todoItemList.length) {
            todoItemList.forEach((value, index) => {
              addList(
                idx,
                takeListUI(
                  value.title,
                  value.description,
                  value.duoDate,
                  value.priority
                )
              );
            });
          }
        }
      });
    }
  }
};
export { renderLocalStorage };
