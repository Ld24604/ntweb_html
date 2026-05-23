// ==================== STATE MANAGEMENT ====================
let tasks = [];
let editingIndex = -1;
const STORAGE_KEY = 'tasks_data';

// ==================== PRIORITY LABELS ====================
const priorityLabels = {
    low: '🟢 Thấp',
    medium: '🟡 Trung bình',
    high: '🔴 Cao'
};

// ==================== DOM ELEMENTS ====================
const btnAddTask = document.getElementById('btnAddTask');
const taskModal = document.getElementById('taskModal');
const confirmModal = document.getElementById('confirmModal');
const btnCloseModal = document.getElementById('btnCloseModal');
const btnCancel = document.getElementById('btnCancel');
const taskForm = document.getElementById('taskForm');
const tasksListContainer = document.getElementById('tasksListContainer');
const notification = document.getElementById('notification');
const totalTasksEl = document.getElementById('totalTasks');
const completedTasksEl = document.getElementById('completedTasks');
const incompleteTasksEl = document.getElementById('incompleteTasks');
const modalTitle = document.getElementById('modalTitle');
const btnSubmit = document.getElementById('btnSubmit');
const taskTitleInput = document.getElementById('taskTitle');
const taskDescriptionInput = document.getElementById('taskDescription');
const taskDueDateInput = document.getElementById('taskDueDate');
const taskPriorityInput = document.getElementById('taskPriority');
const btnConfirmDelete = document.getElementById('btnConfirmDelete');
const btnCancelDelete = document.getElementById('btnCancelDelete');

let deleteConfirmId = null;

// ==================== EVENT LISTENERS ====================
// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadTasksFromStorage();
    renderTasksList();
    updateStatistics();
});

// Add Task button
btnAddTask.addEventListener('click', openAddForm);

// Close modal buttons
btnCloseModal.addEventListener('click', closeModal);
btnCancel.addEventListener('click', closeModal);
btnCancelDelete.addEventListener('click', closeConfirmModal);

// Form submit
taskForm.addEventListener('submit', handleFormSubmit);

// Confirm delete
btnConfirmDelete.addEventListener('click', handleConfirmDelete);

// Close modal when clicking outside
taskModal.addEventListener('click', (e) => {
    if (e.target === taskModal) closeModal();
});

confirmModal.addEventListener('click', (e) => {
    if (e.target === confirmModal) closeConfirmModal();
});

// Event delegation for task actions
tasksListContainer.addEventListener('change', (e) => {
    if (e.target.classList.contains('task-checkbox')) {
        const taskId = e.target.dataset.taskId;
        handleToggleComplete(taskId);
    }
});

tasksListContainer.addEventListener('click', (e) => {
    const taskCard = e.target.closest('.task-card');
    if (!taskCard) return;

    const taskId = taskCard.dataset.taskId;
    const button = e.target.closest('button');
    
    if (!button) return;

    if (button.classList.contains('btn-edit')) {
        const index = tasks.findIndex(t => t.id === taskId);
        openEditForm(index);
    } else if (button.classList.contains('btn-delete')) {
        const index = tasks.findIndex(t => t.id === taskId);
        const task = tasks[index];
        openConfirmModal(taskId, task.title);
    }
});

// ==================== NOTIFICATION FUNCTIONS ====================
function showNotification(message, type = 'success') {
    notification.textContent = message;
    notification.className = `notification show ${type}`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// ==================== MODAL FUNCTIONS ====================
function openAddForm() {
    editingIndex = -1;
    clearForm();
    modalTitle.textContent = 'Thêm công việc mới';
    btnSubmit.textContent = 'Thêm';
    openModal();
}

function openEditForm(index) {
    editingIndex = index;
    const task = tasks[index];
    
    taskTitleInput.value = task.title;
    taskDescriptionInput.value = task.description;
    taskDueDateInput.value = task.dueDate;
    taskPriorityInput.value = task.priority;
    
    modalTitle.textContent = 'Cập nhật công việc';
    btnSubmit.textContent = 'Cập nhật';
    openModal();
}

function openModal() {
    taskModal.classList.add('show');
}

function closeModal() {
    taskModal.classList.remove('show');
    clearForm();
    editingIndex = -1;
}

function openConfirmModal(taskId, taskTitle) {
    const message = `Bạn chắc chắn muốn xóa công việc "${taskTitle}"?`;
    document.getElementById('confirmMessage').textContent = message;
    deleteConfirmId = tasks.findIndex(t => t.id === taskId);
    confirmModal.classList.add('show');
}

function closeConfirmModal() {
    confirmModal.classList.remove('show');
    deleteConfirmId = null;
}

// ==================== FORM FUNCTIONS ====================
function clearForm() {
    taskForm.reset();
    editingIndex = -1;
}

function generateTaskId() {
    return 'TASK_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const taskData = {
        id: editingIndex === -1 ? generateTaskId() : tasks[editingIndex].id,
        title: taskTitleInput.value,
        description: taskDescriptionInput.value,
        dueDate: taskDueDateInput.value,
        priority: taskPriorityInput.value,
        completed: editingIndex === -1 ? false : tasks[editingIndex].completed,
        createdAt: editingIndex === -1 ? new Date().toISOString() : tasks[editingIndex].createdAt
    };
    
    // Validation
    if (!taskData.title.trim()) {
        showNotification('Vui lòng nhập tiêu đề công việc', 'error');
        return;
    }
    
    if (!taskData.dueDate) {
        showNotification('Vui lòng chọn hạn hoàn thành', 'error');
        return;
    }
    
    if (!taskData.priority) {
        showNotification('Vui lòng chọn mức ưu tiên', 'error');
        return;
    }
    
    if (editingIndex === -1) {
        tasks.push(taskData);
        showNotification('Thêm công việc thành công', 'success');
    } else {
        tasks[editingIndex] = taskData;
        showNotification('Cập nhật công việc thành công', 'success');
    }
    
    saveTasksToStorage();
    renderTasksList();
    updateStatistics();
    closeModal();
}

// ==================== TASK RENDERING ====================
function renderTasksList() {
    if (tasks.length === 0) {
        tasksListContainer.innerHTML = `
            <div class="empty-state">
                <p>📭 Không có công việc nào</p>
                <p class="empty-hint">Bấm nút "Thêm Công việc" để bắt đầu</p>
            </div>
        `;
        return;
    }
    
    tasksListContainer.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const dueDate = new Date(task.dueDate);
        const formattedDate = dueDate.toLocaleDateString('vi-VN');
        const priorityLabel = priorityLabels[task.priority] || task.priority;
        
        const taskCard = document.createElement('div');
        taskCard.className = `task-card ${task.completed ? 'completed' : ''}`;
        taskCard.dataset.taskId = task.id;
        
        taskCard.innerHTML = `
            <input 
                type="checkbox" 
                class="task-checkbox" 
                ${task.completed ? 'checked' : ''} 
                data-task-id="${task.id}">
            
            <div class="task-content">
                <div class="task-header">
                    <h3 class="task-title">${escapeHtml(task.title)}</h3>
                    <span class="task-priority ${task.priority}">${priorityLabel}</span>
                </div>
                
                ${task.description ? `<p class="task-description">${escapeHtml(task.description)}</p>` : ''}
                
                <div class="task-meta">
                    <div class="task-meta-item">
                        📅 ${formattedDate}
                    </div>
                    <div class="task-meta-item">
                        ${task.completed ? '✅ Đã hoàn thành' : '⏳ Chưa hoàn thành'}
                    </div>
                </div>
            </div>
            
            <div class="task-actions">
                <button class="btn btn-edit btn-small">✏️ Sửa</button>
                <button class="btn btn-delete btn-small">🗑️ Xóa</button>
            </div>
        `;
        
        tasksListContainer.appendChild(taskCard);
    });
}

// ==================== ACTION HANDLERS ====================
function handleToggleComplete(taskId) {
    const index = tasks.findIndex(t => t.id === taskId);
    if (index !== -1) {
        tasks[index].completed = !tasks[index].completed;
        saveTasksToStorage();
        renderTasksList();
        updateStatistics();
        
        const message = tasks[index].completed 
            ? '✅ Công việc đã được đánh dấu hoàn thành' 
            : '⏳ Công việc chuyển về trạng thái chưa hoàn thành';
        showNotification(message, 'success');
    }
}

function handleConfirmDelete() {
    if (deleteConfirmId !== null && deleteConfirmId >= 0) {
        const taskTitle = tasks[deleteConfirmId].title;
        tasks.splice(deleteConfirmId, 1);
        saveTasksToStorage();
        renderTasksList();
        updateStatistics();
        closeConfirmModal();
        showNotification(`Đã xóa công việc "${taskTitle}"`, 'success');
    }
}

// ==================== STATISTICS ====================
function updateStatistics() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const incomplete = total - completed;
    
    totalTasksEl.textContent = total;
    completedTasksEl.textContent = completed;
    incompleteTasksEl.textContent = incomplete;
}

// ==================== STORAGE FUNCTIONS ====================
function saveTasksToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasksFromStorage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            tasks = JSON.parse(stored);
        } catch (e) {
            console.error('Error loading tasks from storage:', e);
            tasks = [];
        }
    }
}

// ==================== UTILITY FUNCTIONS ====================
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
