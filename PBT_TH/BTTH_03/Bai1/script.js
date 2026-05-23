// ==================== STATE MANAGEMENT ====================
let students = [];
let editingIndex = -1;
const STORAGE_KEY = 'students_data';

// ==================== DOM ELEMENTS ====================
const btnAddStudent = document.getElementById('btnAddStudent');
const studentModal = document.getElementById('studentModal');
const confirmModal = document.getElementById('confirmModal');
const btnCloseModal = document.getElementById('btnCloseModal');
const btnCancel = document.getElementById('btnCancel');
const studentForm = document.getElementById('studentForm');
const studentTableBody = document.getElementById('studentTableBody');
const notification = document.getElementById('notification');
const totalStudentsEl = document.getElementById('totalStudents');
const averageScoreEl = document.getElementById('averageScore');
const modalTitle = document.getElementById('modalTitle');
const btnSubmit = document.getElementById('btnSubmit');
const studentIdInput = document.getElementById('studentId');
const studentNameInput = document.getElementById('studentName');
const studentDOBInput = document.getElementById('studentDOB');
const studentClassInput = document.getElementById('studentClass');
const studentScoreInput = document.getElementById('studentScore');
const studentEmailInput = document.getElementById('studentEmail');
const btnConfirmDelete = document.getElementById('btnConfirmDelete');
const btnCancelDelete = document.getElementById('btnCancelDelete');

let deleteConfirmId = null;

// ==================== EVENT LISTENERS ====================
// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadStudentsFromStorage();
    renderStudentsTable();
    updateStatistics();
});

// Add Student button
btnAddStudent.addEventListener('click', openAddForm);

// Close modal buttons
btnCloseModal.addEventListener('click', closeModal);
btnCancel.addEventListener('click', closeModal);
btnCancelDelete.addEventListener('click', closeConfirmModal);

// Form submit
studentForm.addEventListener('submit', handleFormSubmit);

// Confirm delete
btnConfirmDelete.addEventListener('click', handleConfirmDelete);

// Close modal when clicking outside
studentModal.addEventListener('click', (e) => {
    if (e.target === studentModal) closeModal();
});

confirmModal.addEventListener('click', (e) => {
    if (e.target === confirmModal) closeConfirmModal();
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
    studentIdInput.disabled = false;
    studentIdInput.value = generateNewStudentId();
    modalTitle.textContent = 'Thêm sinh viên mới';
    btnSubmit.textContent = 'Thêm';
    openModal();
}

function openEditForm(index) {
    editingIndex = index;
    const student = students[index];
    
    studentIdInput.disabled = true;
    studentIdInput.value = student.id;
    studentNameInput.value = student.name;
    studentDOBInput.value = student.dob;
    studentClassInput.value = student.class;
    studentScoreInput.value = student.score;
    studentEmailInput.value = student.email;
    
    modalTitle.textContent = 'Cập nhật thông tin sinh viên';
    btnSubmit.textContent = 'Cập nhật';
    openModal();
}

function openModal() {
    studentModal.classList.add('show');
}

function closeModal() {
    studentModal.classList.remove('show');
    clearForm();
    editingIndex = -1;
}

function openConfirmModal(studentId, studentName) {
    const message = `Bạn chắc chắn muốn xóa sinh viên ${studentName} (${studentId})?`;
    document.getElementById('confirmMessage').textContent = message;
    deleteConfirmId = students.findIndex(s => s.id === studentId);
    confirmModal.classList.add('show');
}

function closeConfirmModal() {
    confirmModal.classList.remove('show');
    deleteConfirmId = null;
}

// ==================== FORM FUNCTIONS ====================
function clearForm() {
    studentForm.reset();
    studentIdInput.value = generateNewStudentId();
    editingIndex = -1;
}

function generateNewStudentId() {
    if (students.length === 0) return 'SV001';
    const maxId = Math.max(...students.map(s => parseInt(s.id.substring(2))));
    return `SV${String(maxId + 1).padStart(3, '0')}`;
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const studentData = {
        id: studentIdInput.value,
        name: studentNameInput.value,
        dob: studentDOBInput.value,
        class: studentClassInput.value,
        score: parseFloat(studentScoreInput.value),
        email: studentEmailInput.value
    };
    
    // Validate email format
    if (!isValidEmail(studentData.email)) {
        showNotification('Email không hợp lệ', 'error');
        return;
    }
    
    // Validate score range
    if (studentData.score < 0 || studentData.score > 10) {
        showNotification('Điểm phải từ 0 đến 10', 'error');
        return;
    }
    
    if (editingIndex === -1) {
        // Add new student
        // Check if ID already exists
        if (students.some(s => s.id === studentData.id)) {
            showNotification('Mã sinh viên đã tồn tại', 'error');
            return;
        }
        students.push(studentData);
        showNotification('Thêm sinh viên thành công', 'success');
    } else {
        // Update existing student
        students[editingIndex] = studentData;
        showNotification('Cập nhật thông tin sinh viên thành công', 'success');
    }
    
    saveStudentsToStorage();
    renderStudentsTable();
    updateStatistics();
    closeModal();
}

// ==================== TABLE RENDERING ====================
function renderStudentsTable() {
    if (students.length === 0) {
        studentTableBody.innerHTML = '<tr class="empty-row"><td colspan="7">Chưa có dữ liệu sinh viên</td></tr>';
        return;
    }
    
    studentTableBody.innerHTML = '';
    
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        const dateObj = new Date(student.dob);
        const formattedDate = dateObj.toLocaleDateString('vi-VN');
        
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${formattedDate}</td>
            <td>${student.class}</td>
            <td>${student.score.toFixed(2)}</td>
            <td>${student.email}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-edit" onclick="handleEdit(${index})">Sửa</button>
                    <button class="btn btn-delete" onclick="handleDelete(${index})">Xóa</button>
                </div>
            </td>
        `;
        
        studentTableBody.appendChild(row);
    });
}

// ==================== ACTION HANDLERS ====================
function handleEdit(index) {
    openEditForm(index);
}

function handleDelete(index) {
    const student = students[index];
    openConfirmModal(student.id, student.name);
}

function handleConfirmDelete() {
    if (deleteConfirmId !== null && deleteConfirmId >= 0) {
        const studentName = students[deleteConfirmId].name;
        students.splice(deleteConfirmId, 1);
        saveStudentsToStorage();
        renderStudentsTable();
        updateStatistics();
        closeConfirmModal();
        showNotification(`Đã xóa sinh viên ${studentName}`, 'success');
    }
}

// ==================== STATISTICS ====================
function updateStatistics() {
    // Update total students
    totalStudentsEl.textContent = students.length;
    
    // Calculate and update average score
    if (students.length === 0) {
        averageScoreEl.textContent = '0.00';
    } else {
        const totalScore = students.reduce((sum, student) => sum + student.score, 0);
        const average = totalScore / students.length;
        averageScoreEl.textContent = average.toFixed(2);
    }
}

// ==================== STORAGE FUNCTIONS ====================
function saveStudentsToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

function loadStudentsFromStorage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            students = JSON.parse(stored);
        } catch (e) {
            console.error('Error loading students from storage:', e);
            students = [];
        }
    } else {
        // Initialize with sample data if first time
        students = [];
    }
}

// ==================== UTILITY FUNCTIONS ====================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
