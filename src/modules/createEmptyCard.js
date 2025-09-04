const createEmptyCard = (todoValue, idx) => {
  const emptyList = document.createElement("div");
  const title = document.createElement("p");
  const addButton = document.createElement("button");
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
  addButton.setAttribute("data-numberIdx", idx);
  emptyList.classList.add("todo_card", "flex");
  title.classList.add("todo_card--title", "flex");
  title.innerHTML += `<span>${todoValue}</span>`;
  title.innerHTML += `<i class="fa-solid fa-ellipsis-vertical"></i>`;
  emptyList.appendChild(title);
  emptyList.appendChild(addButton);
  emptyList.innerHTML += emptySection;
  return emptyList;
};

export { createEmptyCard };
