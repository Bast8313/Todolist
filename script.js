class TodoApp {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];
    this.inputField = document.getElementById("inputField");
    this.addButton = document.getElementById("addToDo");
    this.todoList = document.getElementById("todoList");
    this.totalTasks = document.getElementById("totalTasks");
    this.completedTasks = document.getElementById("completedTasks");

    this.init();
  }

  init() {
    // Event listeners
    this.addButton.addEventListener("click", () => this.addTask());
    this.inputField.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.addTask();
      }
    });

    // Charger les tâches existantes
    this.renderTasks();
    this.updateStats();
  }

  addTask() {
    const taskText = this.inputField.value.trim();

    if (taskText === "") {
      alert("Veuillez entrer une tâche !");
      return;
    }

    const task = {
      id: Date.now(),
      text: taskText,
      completed: false,
      createdAt: new Date().toLocaleString(),
    };

    this.tasks.push(task);
    this.saveTasks();
    this.renderTasks();
    this.updateStats();
    this.inputField.value = "";
    this.inputField.focus();
  }

  deleteTask(id) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
      this.saveTasks();
      this.renderTasks();
      this.updateStats();
    }
  }

  toggleTask(id) {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.saveTasks();
    this.renderTasks();
    this.updateStats();
  }

  renderTasks() {
    this.todoList.innerHTML = "";

    if (this.tasks.length === 0) {
      this.todoList.innerHTML =
        '<li class="empty-state">Aucune tâche pour le moment. Ajoutez-en une !</li>';
      return;
    }

    this.tasks.forEach((task) => {
      const li = document.createElement("li");
      li.className = `todo-item ${task.completed ? "completed" : ""}`;
      li.innerHTML = `
                        <span class="todo-text" onclick="todoApp.toggleTask(${task.id})">
                            ${task.text}
                        </span>
                        <button class="delete-btn" onclick="todoApp.deleteTask(${task.id})">
                            ✕
                        </button>
                    `;
      this.todoList.appendChild(li);
    });
  }

  updateStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter((task) => task.completed).length;

    this.totalTasks.textContent = `Total: ${total}`;
    this.completedTasks.textContent = `Terminées: ${completed}`;
  }

  saveTasks() {
    localStorage.setItem("todoTasks", JSON.stringify(this.tasks));
  }
}

// Initialiser l'application
const todoApp = new TodoApp();
