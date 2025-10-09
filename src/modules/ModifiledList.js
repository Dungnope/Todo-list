import { renderLocalStorage } from "./renderData.js";
const deleteItemFn = (
  card_list,
  deleted_item,
  list_title,
  card_title,
  card_id,
) => {
  card_list.removeChild(deleted_item);
  const currentCardData = localStorage.getItem(`[${card_title}, ${card_id}]`);
  const currentCardArr = JSON.parse(currentCardData);
  const newCardArr = currentCardArr.filter((value) => {
    return value.title !== list_title;
  });
  localStorage.setItem(
    `[${card_title}, ${card_id}]`,
    JSON.stringify(newCardArr),
  );
};

class changeItem {
  constructor(card_name, list_item_name, new_value1, new_value2) {
    this.cardName = card_name;
    this.listName = list_item_name;
    this.newinfo1 = new_value1;
    this.newinfo2 = new_value2;
  }

  changeDatePriority(cardId) {
    const cardList = localStorage.getItem(`[${this.cardName}, ${cardId}]`);
    const cardListArr = JSON.parse(cardList);
    const modifiedListItem = cardListArr.filter((itemList) => {
      if (itemList.title === this.listName) {
        itemList.duoDate = this.newinfo1;
        itemList.priority = this.newinfo2;
      }
      return itemList;
    });
    localStorage.setItem(
      `[${this.cardName}, ${cardId}]`,
      JSON.stringify(modifiedListItem),
    );
    renderLocalStorage();
  }

  changeTitle(oldTitle, cardId) {
    const cardList = localStorage.getItem(`[${this.cardName}, ${cardId}]`);
    const cardListArr = JSON.parse(cardList);
    const modifiedListItem = cardListArr.filter((itemList) => {
      if (itemList.title === oldTitle) {
        itemList.title = this.newinfo1;
      }
      return itemList;
    });
    localStorage.setItem(
      `[${this.cardName}, ${cardId}]`,
      JSON.stringify(modifiedListItem),
    );
  }

  changeDesc(oldDesc, cardId) {
    const cardList = localStorage.getItem(`[${this.cardName}, ${cardId}]`);
    const cardListArr = JSON.parse(cardList);
    const modifiedListItem = cardListArr.filter((itemList) => {
      if (itemList.description === oldDesc) {
        itemList.description = this.newinfo2;
      }
      return itemList;
    });
    localStorage.setItem(
      `[${this.cardName}, ${cardId}]`,
      JSON.stringify(modifiedListItem),
    );
  }
}

//check work done or undone
const checkDone = (item, card_name, list_name, card_id) => {
  if (item.classList.contains("todo_check--none")) {
    const completeListItem =
      list_name.parentNode.parentNode.parentNode.parentNode;
    completeListItem.style.opacity = "0.6";
    list_name.style.textDecorationLine = "line-through";
    item.removeAttribute("class");
    item.setAttribute(
      "class",
      "fa-solid fa-circle-check todo_check--completed",
    );
    item.style.animation = "checkAnimationDone ease-in 0.2s";
    const cardData = localStorage.getItem(
      `[${card_name.textContent}, ${card_id}]`,
    );
    const cardDataArr = JSON.parse(cardData);
    const newDataArr = cardDataArr.filter((item) => {
      if (item.title === list_name.textContent) {
        item.completed = true;
      }
      return item;
    });
    localStorage.setItem(
      `[${card_name.textContent}, ${card_id}]`,
      JSON.stringify(newDataArr),
    );
  } else if (item.classList.contains("todo_check--completed")) {
    const completeListItem =
      list_name.parentNode.parentNode.parentNode.parentNode;
    completeListItem.style.opacity = "1";
    item.removeAttribute("class");
    item.setAttribute("class", "fa-regular fa-circle todo_check--none");
    list_name.style.textDecorationLine = "none";
    item.style.animation = "none";
    const cardData = localStorage.getItem(
      `[${card_name.textContent}, ${card_id}]`,
    );
    const cardDataArr = JSON.parse(cardData);
    const newDataArr = cardDataArr.filter((item) => {
      if (item.title === list_name.textContent) {
        item.completed = false;
      }
      return item;
    });
    localStorage.setItem(
      `[${card_name.textContent}, ${card_id}]`,
      JSON.stringify(newDataArr),
    );
  }
};

const checkStared = (item, card_name, list_name, card_id) => {
  if (item.classList.contains("todo_stared--regular")) {
    item.removeAttribute("class");
    item.setAttribute("class", "fa-solid fa-star todo_stared--solid");
    item.style.animation = "checkAnimationDone ease-in 0.2s";
    const cardData = localStorage.getItem(
      `[${card_name.textContent}, ${card_id}]`,
    );
    const cardDataArr = JSON.parse(cardData);
    const newDataArr = cardDataArr.filter((item) => {
      if (item.title === list_name.textContent) {
        item.stared = true;
      }
      return item;
    });
    localStorage.setItem(
      `[${card_name.textContent}, ${card_id}]`,
      JSON.stringify(newDataArr),
    );
  } else if (item.classList.contains("todo_stared--solid")) {
    item.removeAttribute("class");
    item.setAttribute("class", "fa-regular fa-star todo_stared--regular");
    item.style.animation = "none";
    const cardData = localStorage.getItem(
      `[${card_name.textContent}, ${card_id}]`,
    );
    const cardDataArr = JSON.parse(cardData);
    const newDataArr = cardDataArr.filter((item) => {
      if (item.title === list_name.textContent) {
        item.stared = false;
      }
      return item;
    });
    localStorage.setItem(
      `[${card_name.textContent}, ${card_id}]`,
      JSON.stringify(newDataArr),
    );
  }
};

//
const changeForm = document.createElement("div");
changeForm.setAttribute("data-list-work--change", "");
changeForm.classList.add("flex");
changeForm.innerHTML += `
<label for="todo_duo_date--change">Duo date</label>
<input type="date" id="todo_duo_date--change" name="tododate" value="2012-03-23"/>
<label for="todo_priority--change">Priority</label>
<select name="priority" id="todo_priority--change">
  <option value="high" class="choose--change">High</option>
  <option value="medium" class="choose--change">Medium</option>
  <option value="low" class="choose--change">Low</option>
</select>
<button data-close-list--change class="btn" type = "submit">Change</button>
`;

//function for change data of a list item
const showOption = () => {
  let title, desc, card_name, old_list_title_name, old_list_desc, card_id;
  const cardDetails = document.querySelectorAll(".todo_card .todo_description");
  cardDetails.forEach((cardDetail, idx) => {
    cardDetail.addEventListener("click", (e) => {
      if (e.target.classList.contains("todo_trash--list")) {
        const itemName = e.target.getAttribute("for");
        const deletedItem = e.currentTarget.children.namedItem(itemName);
        const cardName = e.currentTarget.parentNode.getAttribute("name-card");
        card_id = e.currentTarget.parentNode.getAttribute("id");
        deleteItemFn(e.currentTarget, deletedItem, itemName, cardName, card_id);
        if (!e.currentTarget.firstElementChild) {
          renderLocalStorage();
        }
      }

      //change title and desc of list
      if (e.target.classList.contains("todo_change--list")) {
        const itemName = e.target.getAttribute("for");
        const changedItem = e.currentTarget.children.namedItem(itemName);
        card_name = e.currentTarget.parentNode.getAttribute("name-card");
        title = changedItem.children[1].children[0].children[0].children[0];
        desc = changedItem.children[1].children[0].children[1];
        card_id = e.currentTarget.parentNode.getAttribute("id");
        title.setAttribute("contenteditable", "true");
        desc.setAttribute("contenteditable", "true");
        old_list_title_name = title.textContent;
        title.focus();
        //change title use blur event, the easy thing why I don't use this until do this function
        title.addEventListener("blur", (innerEvent) => {
          title.removeAttribute("contenteditable");
          innerEvent.stopImmediatePropagation();
          const change_Title_Desc = new changeItem(
            card_name,
            old_list_title_name,
            title.textContent,
            desc.textContent,
          );
          change_Title_Desc.changeTitle(old_list_title_name, card_id);
        });
        //change desc
        old_list_desc = desc.textContent;
        desc.addEventListener("blur", (innerEvent) => {
          desc.removeAttribute("contenteditable");
          innerEvent.stopImmediatePropagation();
          const change_Title_Desc = new changeItem(
            card_name,
            old_list_title_name,
            title.textContent,
            desc.textContent,
          );
          change_Title_Desc.changeDesc(old_list_desc, card_id);
        });
      }
      //change date and priority of list
      if (e.target.classList.contains("todo_duo")) {
        const oldItem = e.target.parentNode.parentNode;
        const oldDate = e.target;
        changeForm.style.display = `flex`;
        oldItem.appendChild(changeForm);
        const duoDateValue = document.querySelector("#todo_duo_date--change");
        const priorityValue = document.querySelector("#todo_priority--change");
        const changeBtn = document.querySelector("[data-close-list--change]");
        const oldYear = new Date(oldDate.getAttribute("value")).getFullYear();
        let oldMonth = new Date(oldDate.getAttribute("value")).getMonth() + 1;
        const oldDay = new Date(oldDate.getAttribute("value")).getDate();
        if (oldMonth < 10) {
          oldMonth = "0" + oldMonth;
        }
        priorityValue.value = oldItem.children[2]
          .getAttribute("class")
          .split(" ")[1];
        duoDateValue.value = `${oldYear}-${oldMonth}-${oldDay}`;
        changeBtn.addEventListener("click", (closeEvent) => {
          const cardName =
            closeEvent.currentTarget.parentNode.parentNode.parentNode.parentNode
              .children[0].children[0].innerText;
          const listName =
            closeEvent.currentTarget.parentNode.parentNode.children[1]
              .children[0].children[0].children[0].textContent;
          closeEvent.stopImmediatePropagation();
          changeForm.style.display = "none";
          card_id =
            closeEvent.currentTarget.parentNode.parentNode.parentNode.parentNode.getAttribute(
              "id",
            );
          const change_Date_Priority = new changeItem(
            cardName,
            listName,
            duoDateValue.value,
            priorityValue.value,
          );
          change_Date_Priority.changeDatePriority(card_id);
        });
      }

      //check complete
      if (
        e.target.classList.contains("todo_check--none") ||
        e.target.classList.contains("todo_check--completed")
      ) {
        card_name =
          e.target.parentNode.parentNode.parentNode.parentNode.children[0]
            .children[0];
        old_list_title_name =
          e.target.parentNode.parentNode.children[1].children[0].children[0]
            .children[0];
        card_id =
          e.target.parentNode.parentNode.parentNode.parentNode.getAttribute(
            "id",
          );
        checkDone(e.target, card_name, old_list_title_name, card_id);
      }

      //star task
      if (
        e.target.classList.contains("todo_stared--regular") ||
        e.target.classList.contains("todo_stared--solid")
      ) {
        card_name =
          e.target.parentNode.parentNode.parentNode.parentNode.parentNode
            .parentNode.parentNode.children[0].children[0];
        old_list_title_name = e.target.parentNode.parentNode.children[0];
        card_id =
          e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute(
            "id",
          );
        checkStared(e.target, card_name, old_list_title_name, card_id);
      }

      e.stopPropagation();
    });
  });

  document.addEventListener("click", (Event) => {
    if (changeForm.style.display !== "none") {
      changeForm.style.display = "none";
    }
    try {
      Event.stopImmediatePropagation();
    } catch (error) {
      //  console.warn("This is a function not an error!", Event.target);
    }
  });
};

export { showOption };
