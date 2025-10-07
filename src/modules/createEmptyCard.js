const createEmptyCard = (todoValue, todoId) => {
  if (todoValue === "") todoValue = "No Title";
  const emptyList = document.createElement("div");
  const title = document.createElement("p");
  const addButton = document.createElement("button");
  const modifiedAndDelete = `<span class="flex todo_edit">
  <i class="fa-solid fa-trash todo_trash" title = "Recycle"></i>
  <i class="fa-solid fa-pen-to-square todo_change" title = "rename"></i>
  </span>`;
  const emptySection = `
    <div class="todo_description--empty flex">
        <i class="fa-solid fa-recycle"></i>
        <div>This is empty!</div>
        <p>Add your works and follow them on platform</p>
    </div>
`;
  addButton.innerHTML += `
        <i class="fa-solid fa-file-circle-plus"></i>
        Add work
    `;
  addButton.classList.add("add_work");
  emptyList.classList.add("todo_card", "flex");
  emptyList.setAttribute("id", todoId);
  emptyList.setAttribute("name-card", todoValue);
  title.classList.add("todo_card--title", "flex");
  title.innerHTML += `<span class="todo_name">${todoValue}</span>`;
  title.innerHTML += modifiedAndDelete;
  emptyList.appendChild(title);
  emptyList.appendChild(addButton);
  emptyList.innerHTML += emptySection;
  return emptyList;
};

export { createEmptyCard };
