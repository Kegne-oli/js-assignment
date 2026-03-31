class TaskManager {
    static tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    static saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
    
    static addTask() {
        const title = document.getElementById('title').value;
        if (!title.trim()) return;
        
        const task = {
            id: Date.now(),
            title: title.trim(),
            desc: document.getElementById('desc').value.trim(),
            dueDate: document.getElementById('dueDate').value,
            priority: document.getElementById('priority').value,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        this.tasks.push(task);
        this.saveTasks();
        this.renderTasks();
        this.clearForm();
    }
    
    static clearForm() {
        document.getElementById('title').value = '';
        document.getElementById('desc').value = '';
        document.getElementById('dueDate').value = '';
    }
    
    static toggleComplete(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.renderTasks();
        }
    }
    
    static deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveTasks();
        this.renderTasks();
    }
    
    static updateStats(tasksList = this.tasks) {
        document.getElementById('total').textContent = tasksList.length;
        document.getElementById('completed').textContent = tasksList.filter(t => t.completed).length;
        document.getElementById('high').textContent = tasksList.filter(t => t.priority === 'high').length;
    }
    
    static setFilter(filterType) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        TaskManager.currentFilter = filterType;
        TaskManager.filterTasks();
    }
    
    static currentFilter = 'all';
    
    static filterTasks() {
        const query = document.getElementById('filter').value.toLowerCase();
        let filtered = this.tasks;
        
        // Filter by status/priority
        if (this.currentFilter === 'pending') {
            filtered = filtered.filter(t => !t.completed);
        } else if (this.currentFilter === 'completed') {
            filtered = filtered.filter(t => t.completed);
        } else if (this.currentFilter === 'high') {
            filtered = filtered.filter(t => t.priority === 'high');
        }
        
        // Text search
        if (query) {
            filtered = filtered.filter(t => 
                t.title.toLowerCase().includes(query) ||
                t.desc.toLowerCase().includes(query)
            );
        }
        
        this.renderTasks(filtered);
    }
    
    static renderTasks(filteredTasks = this.tasks) {
        const list = document.getElementById('taskList');
        list.innerHTML = '';
        
        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.priority} ${task.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <div class="task-content">
                    <h3>${this.escapeHtml(task.title)}</h3>
                    ${task.desc ? `<p>${this.escapeHtml(task.desc)}</p>` : ''}
                    <div class="task-meta">
                        <span class="priority-badge ${task.priority}">${task.priority.toUpperCase()}</span>
                        <small>${task.dueDate ? `Due: ${new Date(task.dueDate).toLocaleDateString()}` : 'No due date'}</small>
                    </div>
                </div>
                <div class="task-actions">
                    <label class="checkbox-container">
                        <input type="checkbox" ${task.completed ? 'checked' : ''} 
                               onchange="TaskManager.toggleComplete(${task.id})">
                        <span class="checkmark"></span>
                    </label>
                    <button onclick="TaskManager.deleteTask(${task.id})" class="delete-btn">
                        🗑️ Delete
                    </button>
                </div>
            `;
            list.appendChild(li);
        });
        
        this.updateStats(filteredTasks);
    }
    
    static escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    TaskManager.renderTasks();
    
    // Enter key to add task
    document.getElementById('title').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') TaskManager.addTask();
    });
});