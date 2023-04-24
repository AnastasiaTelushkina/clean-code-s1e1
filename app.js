 const CSSClasses = {
    TASK : "task",
    CHECKBOX: "list-item__checkbox",
    LABEL: "list-item__label",
    INPUT: "list-item__input",
    BUTTON: "btn",
    EDIT_BUTTON: "list-item__edit-btn",
    DELETE_BUTTON: "list-item__delete-btn",
    LIST_ITEM: "list-item"

};
let taskInput = document.getElementById("new-task"); //Add a new task.
let addButton = document.getElementsByTagName("button")[0];  
let incompleteTaskHolder = document.getElementById("incomplete-tasks");  
let completedTasksHolder = document.getElementById("completed-tasks");  

//New task list item
const createElement = (elType, elClassList, elInnerText, elInputType) => {
    let newElem         = document.createElement(elType);  
    newElem.innerText   = elInnerText || ""; 
    (!!elClassList)     && newElem.classList.add(...elClassList); 
    (elType == "input") && (newElem.type = elInputType); 
    return newElem;
}
const createNewTaskElement = function (taskString) {

  let listItem = createElement("li", [CSSClasses.LIST_ITEM], ""); 
  let checkBox = createElement("input", [CSSClasses.CHECKBOX], "", "checkbox");  
  let label = createElement("label", [CSSClasses.TASK, CSSClasses.LABEL], taskString);  
  let editInput = createElement("input", [CSSClasses.TASK, CSSClasses.INPUT], "", "text");  
  let editButton = createElement("button", [CSSClasses.EDIT_BUTTON, CSSClasses.BUTTON], "Edit");   
  let deleteButton = createElement("button", [CSSClasses.DELETE_BUTTON, CSSClasses.BUTTON]);  

  let deleteButtonImg = createElement("img"); 
  deleteButtonImg.src = "./assets/remove.svg";  
  deleteButton.appendChild(deleteButtonImg);
  
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

const addTask = function ()  {

  console.log("Add Task...");
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  let listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
};

//Edit an existing task.

const editTask = function ()  {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  let listItem = this.parentNode;

  let editInput = listItem.querySelector(".list-item__input");
  let label = listItem.querySelector(".list-item__label");
  let editBtn = listItem.querySelector(".list-item__edit-btn");
  let containsClass = listItem.classList.contains("edit-mode");
  //If class of the parent is .edit-mode
  if (containsClass) {
    //switch to .edit-mode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  //toggle .edit-mode on the parent.
  listItem.classList.toggle("edit-mode");
};

//Delete task.
const deleteTask = function ()  {
  console.log("Delete Task...");

  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
};

//Mark task completed
const taskCompleted = function ()  {
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  let listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function ()  {
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  let listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

const ajaxRequest = function ()  {
  console.log("AJAX Request");
};

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");
  //select ListItems children
  let checkBox = taskListItem.querySelector(".list-item__checkbox");
  let editButton = taskListItem.querySelector(".list-item__edit-btn");
  let deleteButton = taskListItem.querySelector(".list-item__delete-btn");

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
};

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
 
