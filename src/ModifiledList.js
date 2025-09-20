import { renderLocalStorage } from "./renderData.js";
const deleteItemFn = (card_list, deleted_item, list_title, card_title) => {
  card_list.removeChild(deleted_item);
  const currentCardData = localStorage.getItem(card_title);
  const currentCardArr = JSON.parse(currentCardData);
  const newCardArr = currentCardArr.filter((value) => {
    return value.title !== list_title;
  });
  localStorage.setItem(card_title, JSON.stringify(newCardArr));
};

class changeItem{
  constructor(card_name, list_item_name, new_value1, new_value2){
    this.cardName = card_name;
    this.listName = list_item_name;
    this.newinfo1 = new_value1;
    this.newinfo2 = new_value2;
  }

  changeDatePriority(){
    const cardList = localStorage.getItem(this.cardName);
    const cardListArr = JSON.parse(cardList);
    const modifiedListItem = cardListArr.filter((itemList) => {
      if(itemList.title === this.listName){
        itemList.duoDate = this.newinfo1;
        itemList.priority = this.newinfo2;
      }
      return itemList;
    })
    localStorage.setItem(this.cardName, JSON.stringify(modifiedListItem));
    renderLocalStorage();
  }

  changeTitle(oldTitle){
    const cardList = localStorage.getItem(this.cardName);
    const cardListArr = JSON.parse(cardList);
    const modifiedListItem = cardListArr.filter((itemList) => {
      if(itemList.title === oldTitle){
        itemList.title = this.newinfo1;
      }
      return itemList;
    })
    localStorage.setItem(this.cardName, JSON.stringify(modifiedListItem));
  }

  changeDesc(oldDesc){
    const cardList = localStorage.getItem(this.cardName);
    const cardListArr = JSON.parse(cardList);
    const modifiedListItem = cardListArr.filter((itemList) => {
      if(itemList.description === oldDesc){
        itemList.description = this.newinfo2;
      }
      return itemList;
    })
    localStorage.setItem(this.cardName, JSON.stringify(modifiedListItem));
  }
}
    

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
  let title, desc, card_name, old_list_title_name, old_list_desc;
  const cardDetails = document.querySelectorAll(".todo_card .todo_description");
  cardDetails.forEach((cardDetail, idx) => {
    cardDetail.addEventListener("click", (e) => {
      if (e.target.classList.contains("todo_trash--list")) {
        const itemName = e.target.getAttribute("for");
        const deletedItem = e.currentTarget.children.namedItem(itemName);
        const cardName = e.currentTarget.parentNode.getAttribute("name-card");
        deleteItemFn(e.currentTarget, deletedItem, itemName, cardName);
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
        title.setAttribute("contenteditable", "true");      
        desc.setAttribute("contenteditable", "true");
        old_list_title_name = title.textContent;
        title.focus();
        //change title use blur event, the easy thing why I don't use this until do this function
        title.addEventListener("blur", (innerEvent) => {
          title.removeAttribute("contenteditable");
          innerEvent.stopImmediatePropagation();
          const change_Title_Desc = new changeItem(card_name, old_list_title_name, title.textContent, desc.textContent);
          change_Title_Desc.changeTitle(old_list_title_name);
        })
        //change desc
        old_list_desc = desc.textContent;
        desc.addEventListener("blur", (innerEvent) => {
          desc.removeAttribute("contenteditable");
          innerEvent.stopImmediatePropagation();
          const change_Title_Desc = new changeItem(card_name, old_list_title_name, title.textContent, desc.textContent);
          change_Title_Desc.changeDesc(old_list_desc);
        })
      }
      //change date and priority of list
      if(e.target.classList.contains("todo_duo")){
        const oldItem = e.target.parentNode.parentNode;
        const oldDate = e.target;
        changeForm.style.display = `flex`;
        oldItem.appendChild(changeForm);
        const duoDateValue = document.querySelector("#todo_duo_date--change");
        const priorityValue = document.querySelector("#todo_priority--change");
        const changeBtn = document.querySelector("[data-close-list--change]");
        const oldYear = new Date (oldDate.getAttribute("value")).getFullYear();
        let oldMonth = new Date (oldDate.getAttribute("value")).getMonth() + 1;
        const oldDay = new Date (oldDate.getAttribute("value")).getDate();
        if(oldMonth < 10){
          oldMonth = "0" + oldMonth;
        }
        priorityValue.value = oldItem.children[2].getAttribute("class").split(" ")[1];
        duoDateValue.value =  `${oldYear}-${oldMonth}-${oldDay}`;
        changeBtn.addEventListener("click", (closeEvent) => {
          const cardName = closeEvent.currentTarget.parentNode.parentNode.parentNode.parentNode.children[0].children[0].innerText;
          const listName = closeEvent.currentTarget.parentNode.parentNode.children[1].children[0].children[0].children[0].textContent;
          closeEvent.stopImmediatePropagation();
          changeForm.style.display = "none";
          const change_Date_Priority = new changeItem(cardName, listName, duoDateValue.value, priorityValue.value);
          change_Date_Priority.changeDatePriority();
        })
      }
      e.stopPropagation();
    });
  });

  document.addEventListener("click", (Event) => {
    if(changeForm.style.display !== "none"){
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
