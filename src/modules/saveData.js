class todoData {
  constructor(name) {
    this.name = name;
    this.id = self.crypto.randomUUID();
  }
}

class todoItemData {
  constructor(title, description, duo, priority) {
    this.title = title;
    this.description = description;
    this.duoDate = duo;
    this.priority = priority;
    this.completed = false;
    this.stared = false;
  }
}

const generateDataFromKey = (titleValue) => {
  if (titleValue === "" || titleValue === " ") {
    titleValue = "No Title";
  }
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
  card_idx,
  card_ID
) => {
  const todoTitleStr = localStorage.getItem("todo");
  const currentTodo = JSON.parse(todoTitleStr);
  if(title_data === ""){
    title_data = "No Title";
  }
  if(description_data === ""){
    description_data = "No description";
  }
  if(duo_data === ""){
    const month = new Date().getMonth() + 1;
    let monthLowerThanTen;
    if(month < 10){
      monthLowerThanTen = "0" + month;
    }
    const day = new Date().getDate();
    const year = new Date().getFullYear();
    if(month < 10){
      duo_data = `${year}-${monthLowerThanTen}-${day}`;
    }
    else{
      duo_data = `${year}-${month}-${day}`;
    }
  }
  const newDetailData = new todoItemData(
    title_data,
    description_data,
    duo_data,
    priority_data
  );
  const todoItemStr = localStorage.getItem(`[${currentTodo[card_idx].name}, ${card_ID}]`);
  if (todoItemStr) {
    const currentItem = JSON.parse(todoItemStr);
    currentItem.push(newDetailData);
    localStorage.setItem(
      `[${currentTodo[card_idx].name}, ${card_ID}]`,
      JSON.stringify(currentItem)
    );
  } else {
    currentTodo.forEach((element) => {
      if (currentTodo[card_idx].name === element.name) {
        localStorage.setItem(
          `[${currentTodo[card_idx].name}, ${card_ID}]`,
          JSON.stringify([newDetailData])
        );
      }
    });
  }
};

export { generateDataFromKey, generateDataOfItem };
