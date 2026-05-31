const signupForm = document.querySelector("#signup-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmInput = document.querySelector("#confirm-password");
const phoneInput = document.querySelector("#phone");
const submitBtn = document.querySelector("#submit-btn");

const nameFeedback = document.querySelector("#name-feedback");
const emailFeedback = document.querySelector("#email-feedback");
const passwordFeedback = document.querySelector("#password-feedback");
const confirmFeedback = document.querySelector("#confirm-feedback");
const phoneFeedback = document.querySelector("#phone-feedback");
const strengthBar = document.querySelector("#strength-bar");
const successModal = document.querySelector("#success-modal");
const modalMessage = document.querySelector("#modal-message");
const modalClose = document.querySelector("#modal-close");

const state = {
    nameValid: false,
    emailValid: false,
    passwordStrength: 0,
    confirmValid: false,
    phoneValid: false
};

function validateName() {
    const value = nameInput.value.trim();
    state.nameValid = value.length >= 2 && value.length <= 50;
    nameFeedback.textContent = state.nameValid
        ? "Looks good!"
        : "Name must be 2 to 50 characters.";
    nameFeedback.className = `feedback ${state.nameValid ? "valid" : "invalid"}`;
}

function validateEmail() {
    const value = emailInput.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    state.emailValid = regex.test(value);
    emailFeedback.textContent = state.emailValid
        ? "Email looks valid."
        : "Enter a valid email address.";
    emailFeedback.className = `feedback ${state.emailValid ? "valid" : "invalid"}`;
}

function calculatePasswordStrength(value) {
    let score = 0;
    if (value.length >= 8) score += 1;
    if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score += 1;
    if (/[0-9]/.test(value)) score += 1;
    if (/[^A-Za-z0-9]/.test(value)) score += 1;
    return score;
}

function validatePassword() {
    const value = passwordInput.value;
    const score = calculatePasswordStrength(value);
    state.passwordStrength = score;
    const progress = Math.min((score / 4) * 100, 100);
    strengthBar.style.width = `${progress}%`;
    if (score <= 1) {
        strengthBar.style.background = "var(--danger)";
        passwordFeedback.textContent = "Password is weak.";
    } else if (score === 2 || score === 3) {
        strengthBar.style.background = "var(--warning)";
        passwordFeedback.textContent = "Password strength is medium.";
    } else {
        strengthBar.style.background = "var(--success)";
        passwordFeedback.textContent = "Password is strong.";
    }
    passwordFeedback.className = `feedback ${score >= 2 ? "valid" : "invalid"}`;
}

function validateConfirmPassword() {
    const value = confirmInput.value;
    state.confirmValid = value === passwordInput.value && value.length > 0;
    confirmFeedback.textContent = state.confirmValid
        ? "Passwords match." 
        : "Passwords do not match.";
    confirmFeedback.className = `feedback ${state.confirmValid ? "valid" : "invalid"}`;
}

function formatPhone(value) {
    return value
        .replace(/[^0-9]/g, "")
        .slice(0, 10)
        .replace(/(\d{3})(\d{3})(\d{1,4})/, (_, a, b, c) => `${a}-${b}-${c}`)
        .replace(/-$/, "");
}

function validatePhone() {
    const value = phoneInput.value.trim();
    const digits = value.replace(/[^0-9]/g, "");
    state.phoneValid = digits.length === 10;
    phoneFeedback.textContent = state.phoneValid
        ? "Phone number is valid." 
        : "Enter a 10-digit phone number.";
    phoneFeedback.className = `feedback ${state.phoneValid ? "valid" : "invalid"}`;
}

function updateSubmitState() {
    const valid = state.nameValid && state.emailValid && state.passwordStrength >= 2 && state.confirmValid && state.phoneValid;
    submitBtn.disabled = !valid;
}

nameInput.addEventListener("input", () => {
    validateName();
    updateSubmitState();
});

emailInput.addEventListener("input", () => {
    validateEmail();
    updateSubmitState();
});

passwordInput.addEventListener("input", () => {
    validatePassword();
    validateConfirmPassword();
    updateSubmitState();
});

confirmInput.addEventListener("input", () => {
    validateConfirmPassword();
    updateSubmitState();
});

phoneInput.addEventListener("input", event => {
    const formatted = formatPhone(event.target.value);
    phoneInput.value = formatted;
    validatePhone();
    updateSubmitState();
});

signupForm.addEventListener("submit", event => {
    event.preventDefault();
    if (submitBtn.disabled) return;

    modalMessage.textContent = `Welcome, ${nameInput.value.trim()}! Your account is ready.`;
    successModal.classList.add("active");
    successModal.setAttribute("aria-hidden", "false");
});

modalClose.addEventListener("click", () => {
    successModal.classList.remove("active");
    successModal.setAttribute("aria-hidden", "true");
});

successModal.addEventListener("click", event => {
    if (event.target === successModal) {
        successModal.classList.remove("active");
        successModal.setAttribute("aria-hidden", "true");
    }
});

window.addEventListener("keydown", event => {
    if (event.key === "Escape" && successModal.classList.contains("active")) {
        successModal.classList.remove("active");
        successModal.setAttribute("aria-hidden", "true");
    }
});

validateName();
validateEmail();
validatePassword();
validateConfirmPassword();
validatePhone();
updateSubmitState();
