// ===== OOP CONSTRUCTOR =====
function Task(title, description, priority) {
    this.id = Date.now();
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.completed = false;

    this.toggle = function () {
        this.completed = !this.completed;
    };

    this.getInfo = function () {
        return `${this.completed ? "✅ Done" : "⏳ Pending"}`;
    };
}

// ===== ARRAY =====
const tasks = [];

// ===== ADD TASK =====
function addTask() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const priority = document.getElementById("priority").value;

    if (!title) return alert("Enter a title!");

    const task = new Task(title, description, priority);
    tasks.push(task);

    displayTasks();
    calculateStats();
}

// ===== DISPLAY TASKS =====
function displayTasks() {
    const container = document.getElementById("task-display");
    container.innerHTML = "";

    tasks.forEach(task => {
        const div = document.createElement("div");
        div.className = `task ${task.priority.toLowerCase()}`;

        div.innerHTML = `
            <strong>${task.title}</strong>
            <p>${task.description}</p>
            <small>${task.getInfo()}</small>
            <button class="complete-btn" onclick="toggleTask(${task.id})">✔ Complete</button>
            <button class="delete-btn" onclick="deleteTask(${task.id})">🗑 Delete</button>
        `;

        container.appendChild(div);
    });
}

// ===== TOGGLE =====
const toggleTask = (id) => {
    const task = tasks.find(t => t.id === id);
    if (task) task.toggle();
    displayTasks();
    calculateStats();
};

// ===== DELETE =====
const deleteTask = (id) => {
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) tasks.splice(index, 1);
    displayTasks();
    calculateStats();
};

// ===== FILTER =====
const getCompletedTasks = () => tasks.filter(t => t.completed);

// ===== MAP =====
const getTitles = () => tasks.map(t => t.title);

// ===== STATS =====
function calculateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    document.getElementById("statistics").innerHTML = `
        📊 Total: ${total} | ✅ Completed: ${completed} | ⏳ Pending: ${pending}
    `;
}

// ===== LOOP DEMO =====
// FOR LOOP
for (let i = 0; i < tasks.length; i++) {
    console.log(tasks[i]);
}

// WHILE LOOP
let i = 0;
while (i < tasks.length) {
    console.log(tasks[i]);
    i++;
}

// ===== CONDITIONALS =====
function checkTask(task) {
    if (task.completed) {
        console.log("Done");
    } else {
        console.log("Pending");
    }
}

// SWITCH
function priorityColor(priority) {
    switch (priority) {
        case "High": return "red";
        case "Medium": return "orange";
        case "Low": return "green";
        default: return "gray";
    }
}