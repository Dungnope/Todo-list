import { generateDataOfItem } from "./saveData.js";

const deleteEmptySection = (index) => {
  const todoSection = document.querySelectorAll(".todo_cards .todo_card");
  const todoSectionLastChild = todoSection[index].lastElementChild;
  // todoSection[index].removeChild(todoSectionLastChild);
  todoSection[index].removeChild(todoSectionLastChild);
};

const addList = (indexNumber, take_detail) => {
  const todoCard = document.querySelectorAll(".todo_cards .todo_card");
  if (
    todoCard[indexNumber].lastElementChild.classList.contains(
      "todo_description--empty"
    )
  ) {
    deleteEmptySection(indexNumber);
    const newlist = document.createElement("ul");
    newlist.classList.add("todo_description", "flex");
    todoCard[indexNumber].appendChild(newlist);
    todoCard[indexNumber].lastElementChild.innerHTML += take_detail;
  } else {
    todoCard[indexNumber].lastElementChild.innerHTML += take_detail;
  }
};

const takeListUI = (title, desc, duo, priority) => {
  if (duo === "") duo = "Today";
  return `
  <li class = "todo_description_details">
    <span><i class="fa-regular fa-circle-check todo_check"></i></span>
    <div class="todo_description_inside">
        <div class="todo_description_text flex">
            <div class="todo_titlebar flex">
                <span>${title}</span>
                <div class="todo_statusbar flex">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                    <i class="fa-regular fa-star"></i>
                </div>
            </div>
            <p>${desc}</p>
        </div>
        <span class="todo_duo">
            ${duo}
        </span>
    </div>
    <div class="todo_priority ${priority}"></div>
  </li>
  `;
};

const addResolve = () => {
  const createBtn = document.querySelector("[data-close-list]");
  const modal = document.querySelector("[data-list-work]");
  const titleInfo = document.querySelector("#todo_Title_Item");
  const descInfo = document.querySelector("#todo_Description_Item");
  const duoInfo = document.querySelector("#todo_duo_date");
  const priorityInfo = document.querySelector("#todo_priority");
  let takeDetail;
  return new Promise((resolve) => {
    createBtn.addEventListener("click", (event) => {
      // addList(e.target.getAtrribute("data-numberidx"), takeDetail);
      resolve([
        takeListUI(
          titleInfo.value,
          descInfo.value,
          duoInfo.value,
          priorityInfo.value
        ),
        titleInfo.value,
        descInfo.value,
        duoInfo.value,
        priorityInfo.value,
      ]);
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
  });
};

const addWork = () => {
  const addWorkBtns = document.querySelectorAll("[data-numberidx]");
  addWorkBtns.forEach((btn, indexNumber) => {
    const titleInfo = document.querySelector("#todo_Title_Item");
    const descInfo = document.querySelector("#todo_Description_Item");
    const duoInfo = document.querySelector("#todo_duo_date");
    const priorityInfo = document.querySelector("#todo_priority");
    const modal = document.querySelector("[data-list-work]");
    btn.addEventListener("click", (e) => {
      modal.showModal();
      let item = e.currentTarget.getAttribute("data-numberidx");
      let takeDetail;
      addResolve().then((val) => {
        addList(item, val[0]);
        generateDataOfItem(val[1], val[2], val[3], val[4], item);
      });
      titleInfo.value = "";
      descInfo.value = "";
      duoInfo.value = "";
      priorityInfo.value = "high";
    });
  });
};
export { addWork, addList, takeListUI };
