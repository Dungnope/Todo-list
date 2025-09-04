class todoData {
  constructor(name) {
    this.name = name;
    this.id = self.crypto.randomUUID();
    // this.idx = null;
  }
}

class todoItemData {
  constructor(title, description, duo, priority) {
    this.title = title;
    this.description = description;
    this.duoDate = duo;
    this.priority = priority;
  }
}

const generateDataFromKey = (titleValue) => {
  const todoTitleStr = localStorage.getItem("todo");
  const newTodo = new todoData(titleValue);
  if (todoTitleStr) {
    const currentTodo = JSON.parse(todoTitleStr);
    // const currentTodoLengthIdx = currentTodo.length - 1;
    // newTodo.idx = currentTodo[currentTodoLengthIdx].idx + 1;
    currentTodo.push(newTodo);
    localStorage.setItem("todo", JSON.stringify(currentTodo));
  } else {
    // newTodo.idx = 0;
    localStorage.setItem("todo", JSON.stringify([newTodo]));
  }
};

const generateDataOfItem = (
  title_data,
  description_data,
  duo_data,
  priority_data,
  card_idx
) => {
  const todoTitleStr = localStorage.getItem("todo");
  const currentTodo = JSON.parse(todoTitleStr);
  const newDetailData = new todoItemData(
    title_data,
    description_data,
    duo_data,
    priority_data
  );
  const todoItemStr = localStorage.getItem(`${currentTodo[card_idx].name}`);
  if (todoItemStr) {
    const currentItem = JSON.parse(todoItemStr);
    currentItem.push(newDetailData);
    localStorage.setItem(
      `${currentTodo[card_idx].name}`,
      JSON.stringify(currentItem)
    );
  } else {
    currentTodo.forEach((element) => {
      if (currentTodo[card_idx].name === element.name) {
        localStorage.setItem(
          `${currentTodo[card_idx].name}`,
          JSON.stringify([newDetailData])
        );
      }
    });
  }
};

export { generateDataFromKey, generateDataOfItem };
