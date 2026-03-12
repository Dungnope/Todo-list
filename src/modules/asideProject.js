const asideList = () => {
  const projectSideBar = document.querySelector(".todo_title");
  const projectSide = document.querySelector(".todo_projects");
  projectSideBar.addEventListener("click", (e) => {
    projectSide.classList.toggle("hide");
    if (!projectSide.classList.contains("hide")) {
      projectSideBar.lastElementChild.style.transform = "translateY(50%)";
    } else {
      projectSideBar.lastElementChild.style.backgroundColor = "transparent";
      projectSideBar.lastElementChild.style.transform =
        "rotateZ(270deg) translateX(-25%)";
    }
  });
};

  //to mark how many tasks undone
  const loadUndone = (name, id, listItemInfo) => {
    let unDone = 0;
    const listTasks = localStorage.getItem(`[${name}, ${id}]`);
    const listTask = JSON.parse(listTasks);

    //create unDoneTask sign
    const undoneMark = document.createElement("div");
    undoneMark.setAttribute("class", "aside__statusList");
    if(listTasks){
      listTask.forEach((itemChild) => {
        if(!itemChild.completed){
          unDone++;
        }
      })
    }

    if(unDone === 0){
      undoneMark.classList.add("aside__statusList--complete");
      let doneIcon = `<i class="fa-solid fa-check"></i>`
      undoneMark.innerHTML += doneIcon;
      listItemInfo.appendChild(undoneMark);
      return;
    }
    undoneMark.classList.add("aside__statusList--notcomplete");
    undoneMark.textContent = unDone;
    listItemInfo.appendChild(undoneMark);
  }

const loadList = () => {
  const listItem = localStorage.getItem("todo");
  const listItemArr = JSON.parse(listItem);
  const projectSide = document.querySelector(".todo_projects");
  projectSide.innerHTML = "";
  if (listItem) {
    listItemArr.forEach((item) => {
      const listItemInfo = document.createElement("li");
      const listNavigation = document.createElement("a");
      const listItemSpan = document.createElement("span");
      listItemInfo.classList.add("todo_list", "flex");
      listItemInfo.setAttribute("data-unique-name", item.name);
      listItemSpan.setAttribute("name", item.name);
      listItemSpan.textContent = item.name;
      listNavigation.setAttribute("href", `#${item.id}`);
      listNavigation.appendChild(listItemSpan);
      listItemInfo.appendChild(listNavigation);
      loadUndone(item.name, item.id, listItemSpan);
      projectSide.appendChild(listItemInfo);
    });
  }


  if (projectSide.innerHTML === "" || projectSide.textContent === "") {
    projectSide.style.display = "none";
  } else {
    projectSide.removeAttribute("style");
  }

  const getdata = localStorage.getItem("todo");
  if (!getdata) {
    projectSide.style.display = "none";
  }                                     
};

export { asideList, loadList };
