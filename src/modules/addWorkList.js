import { generateDataOfItem } from "./saveData.js";
import { renderLocalStorage } from "./renderData.js";
const deleteEmptySection = (index) => {
  const todoSection = document.querySelectorAll(".todo_cards .todo_card");
  const todoSectionLastChild = todoSection[index].lastElementChild;
  todoSection[index].removeChild(todoSectionLastChild);
};

const addList = (indexNumber, take_detail) => {
  const todoCard = document.querySelectorAll(".todo_cards .todo_card");
  if (
    todoCard[indexNumber].lastElementChild.classList.contains(
      "todo_description--empty",
    )
  ) {
    deleteEmptySection(indexNumber);
    const newlist = document.createElement("ul");
    newlist.classList.add("todo_description");
    todoCard[indexNumber].appendChild(newlist);
    todoCard[indexNumber].lastElementChild.innerHTML += take_detail;
  } else {
    todoCard[indexNumber].lastElementChild.innerHTML += take_detail;
  }
};

const takeListUI = (title, desc, duo, priority, completed, stared) => {
  const dateConfigure = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  if (duo === "") {
    duo = new Intl.DateTimeFormat("en-US", dateConfigure);
    const fixedDate = duo.format(new Date()).toString().split(" ");
    fixedDate.shift();
    duo = fixedDate.join(" ");
  } else if (duo !== "") {
    const date = new Date(duo);
    duo = new Intl.DateTimeFormat("en-US", dateConfigure);
    const fixedDate = duo.format(new Date(date)).toString().split(" ");
    fixedDate.shift();
    duo = fixedDate.join(" ");
  }
  if (desc === "") {
    desc = "No description";
  }
  if (title === "") {
    title = "No title";
  }
  let checkStatus = [];
  if (completed == false) {
    checkStatus[0] = "fa-regular fa-circle todo_check--none";
    checkStatus[1] = `style="text-decoration-line: "none"`;
    checkStatus[2] = `style="opacity:1"`;
  } else {
    checkStatus[0] = "fa-solid fa-circle-check todo_check--completed";
    checkStatus[1] = `style="text-decoration-line: line-through;"`;
    checkStatus[2] = `style="opacity:0.6"`;
  }

  let checkstar;
  if (stared) {
    checkstar = "fa-solid fa-star todo_stared--solid";
  } else {
    checkstar = "fa-regular fa-star todo_stared--regular";
  }

  return `
  <li class = "todo_description_details" name = "${title}" ${checkStatus[2]}>
    <span><i class="${checkStatus[0]}"></i></i></span>
    <div class="todo_description_inside">
        <div class="todo_description_text flex">
            <div class="todo_titlebar flex">
                <span class="todo_titlebar-title" ${checkStatus[1]}>${title}</span>
                <div class="todo_statusbar flex">
                    <i class="fa-solid fa-trash todo_trash--list" for="${title}"></i>
                    <i class="fa-solid fa-pen todo_change--list" for="${title}"></i>
                    <i class="${checkstar}"></i>
                </div>
            </div>
            <p todo_description_text--desc>${desc}</p>
        </div>
        <span class="todo_duo" value = "${duo}">
            ${duo}
        </span>
    </div>
    <div class="todo_priority ${priority}"></div>
  </li>
  `;
};

const addResolve = () => {
  const titleInfo = document.querySelector("#todo_Title_Item");
  const descInfo = document.querySelector("#todo_Description_Item");
  const duoInfo = document.querySelector("#todo_duo_date");
  const priorityInfo = document.querySelector("#todo_priority");
  return new Promise((resolve) => {
    // addList(e.target.getAtrribute("data-numberidx"), takeDetail);
    resolve([
      takeListUI(
        titleInfo.value,
        descInfo.value,
        duoInfo.value,
        priorityInfo.value,
        false,
      ),
      titleInfo.value,
      descInfo.value,
      duoInfo.value,
      priorityInfo.value,
    ]);
  });
};
const newForm = document.createElement("div");
newForm.setAttribute("data-list-work", "");
newForm.classList.add("flex");
newForm.innerHTML += `
<div data-list-title-bar class = "flex">
  <label for="todo_Title_Item">Title</label>
  <i class="fa-solid fa-xmark xBtn" data-btn-close></i>
</div>
      <input
        type="text"
        name="title"
        id="todo_Title_Item"
        placeholder="e.g: Related content"
      required>
      <label for="todo_Description_Item">Description</label>
      <textarea
        type="text"
        name="desc"
        id="todo_Description_Item"
        placeholder="e.g: Morning, Games, ..."
      ></textarea>
      <label for="todo_duo_date">Duo date</label>
      <input type="date" id="todo_duo_date" name="tododate" />
      <label for="todo_priority">Priority</label>
      <select name="priority" id="todo_priority">
        <option value="high" class="choose">High</option>
        <option value="medium" class="choose">Medium</option>
        <option value="low" class="choose">Low</option>
      </select>
      <button data-close-list class="btn" type = "submit">Create</button>
`;
const addWork = () => {
  const todoCard = document.querySelectorAll(".todo_cards .todo_card");
  const addWorkBtns = document.querySelectorAll(".todo_card .add_work");
  for (let indexNumber = 0; indexNumber < addWorkBtns.length; indexNumber++) {
    addWorkBtns[indexNumber].addEventListener("click", (e) => {
      const index = [...addWorkBtns].indexOf(e.currentTarget);
      newForm.style.display = `flex`;
      if (!todoCard[indexNumber].contains(newForm)) {
        newForm.setAttribute("takeindex", index);
        todoCard[indexNumber].appendChild(newForm);
      }
      newForm.setAttribute("takeindex", index);
      const titleInfo = document.querySelector("#todo_Title_Item");
      titleInfo.focus();
      const descInfo = document.querySelector("#todo_Description_Item");
      const duoInfo = document.querySelector("#todo_duo_date");
      const priorityInfo = document.querySelector("#todo_priority");
      const createBtn = document.querySelector("[data-close-list]");

      const closeBtn = document.querySelector("[data-list-title-bar] .xBtn");
      closeBtn.addEventListener("click", () => {
        newForm.style.display = "none";
      });
      createBtn.addEventListener("click", (event) => {
        addResolve()
          .then((val) => {
            if (val[1] !== "" && val[2] !== "") {
              console.log(event.currentTarget.parentNode.parentNode);
              generateDataOfItem(
                val[1],
                val[2],
                val[3],
                val[4],
                newForm.getAttribute("takeindex"),
                event.currentTarget.parentNode.parentNode.getAttribute("id"),
              );
              titleInfo.value = "";
              descInfo.value = "";
              duoInfo.value = "";
              priorityInfo.value = "high";
              newForm.style.display = "none";
              renderLocalStorage();
            }
          })
          .catch((error) => {
            error;
          });
      });
    });
  }
};

export { addWork, addList, takeListUI, newForm };
