
const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");

let tasks = [];

function renderTasks() {
  taskList.replaceChildren();

  tasks.forEach((task) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      renderTasks();
    });

    const title = document.createElement("span");
    title.textContent = task.title;

    if (task.completed) {
      title.style.textDecoration = "line-through";
    }

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
      tasks = tasks.filter((item) => item.id !== task.id);
      renderTasks();
    });

    li.append(checkbox, title, deleteButton);
    taskList.append(li);
  });

  document.querySelector("#total").textContent = tasks.length;

  document.querySelector("#completed").textContent =
    tasks.filter((task) => task.completed).length;

  document.querySelector("#pending").textContent =
    tasks.filter((task) => !task.completed).length;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = input.value.trim();

  if (!title) return;

  tasks.push({
    id: Date.now(),
    title: title,
    completed: false
  });

  input.value = "";
  renderTasks();
});

renderTasks();
