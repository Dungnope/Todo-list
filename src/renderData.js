import { addList, addWork, takeListUI } from "./addWorkList.js";
import { createEmptyCard } from "./createEmptyCard.js";
import { deleteCard, ChangeNameCard } from "./ModifiedCard.js";
import { showOption} from "./ModifiledList.js";
const renderLocalStorage = () => {

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
        const todoItemStr = localStorage.getItem(`${item.name}`);
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
                  value.priority
                )
              );
            });
          } else {
            localStorage.removeItem(item.name);
          }
        }
      });
    }
    deleteCard();
    ChangeNameCard();
    addWork();
    showOption();
  }
};
export { renderLocalStorage };
