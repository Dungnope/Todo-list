const asideList = () => {
    const projectSideBar = document.querySelector(".todo_title"); 
    const projectSide = document.querySelector(".todo_projects"); 
    projectSideBar.addEventListener("click", (e) => {
        projectSide.classList.toggle("hide");
        if(!projectSide.classList.contains("hide")){
            projectSideBar.lastElementChild.style.transform = "translateY(50%)";
        }
        else{
            projectSideBar.lastElementChild.style.backgroundColor = "transparent";
            projectSideBar.lastElementChild.style.transform = "rotateZ(270deg) translateX(-25%)";
        }
    })

}

const loadList = () => {
    const listItem = localStorage.getItem("todo");
    const listItemArr = JSON.parse(listItem);
    const projectSide = document.querySelector(".todo_projects");
    projectSide.innerHTML = "";
    if(listItem != ""){
        listItemArr.forEach(item => {
            const listItemInfo = document.createElement("li");
            const listItemSpan = document.createElement("span");
            const listNavigation = document.createElement("a");
            listItemInfo.classList.add("todo_list", "flex");
            listItemInfo.setAttribute("data-unique-name", item.name);
            listItemSpan.setAttribute("name", item.name);
            listItemSpan.textContent = item.name;
            listNavigation.setAttribute("href", `#${item.id}`);
            listNavigation.appendChild(listItemSpan)
            listItemInfo.appendChild(listNavigation);
            projectSide.appendChild(listItemInfo);
        });
    }
    if(projectSide.children.length === 0){
        projectSide.style.display = "none";
    }
    else{
        projectSide.removeAttribute("style");
    }

    const getdata = localStorage.getItem("todo");
    if(!getdata){
        projectSide.style.display = "none";
    }

}

export {asideList, loadList}