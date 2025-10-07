import { addList, addWork, takeListUI } from "./addWorkList.js";
import { createEmptyCard } from "./createEmptyCard.js";
import { deleteCard, ChangeNameCard } from "./ModifiedCard.js";
import { showOption} from "./ModifiledList.js";
import { asideList, loadList } from "./asideProject.js";
const renderLocalStorage = () => {
  const sidebarList = document.querySelector(".todo_projects");

  const todoListStr = localStorage.getItem("todo");
  if (todoListStr) {
    const todoList = JSON.parse(todoListStr);
    const todoCards = document.querySelector(".todo_section .todo_cards");
    todoCards.innerHTML = "";
    if (todoList && todoList.length) {
      todoList.forEach((item, idx) => {
        //list item
        const newCard = createEmptyCard(item.name, item.id);
        todoCards.appendChild(newCard);
        const todoItemStr = localStorage.getItem(`[${item.name}, ${item.id}]`);
        if (todoItemStr) {
          const todoItemList = JSON.parse(todoItemStr);

          if (todoItemList && todoItemList.length) {
            todoItemList.forEach((value) => {
              addList(
                idx,
                takeListUI(
                  value.title,
                  value.description,
                  value.duoDate,
                  value.priority,
                  value.completed,
                  value.stared
                )
              );
            });
          } else {
            localStorage.removeItem(`[${item.name}, ${item.id}]`);
          }
        }
      });
    }
    deleteCard();
    ChangeNameCard();
    addWork();
    showOption();
  }
  loadList();

};
export { renderLocalStorage };
