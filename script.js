// DOM Elements
const clickButton = document.getElementById('click-button');
const colorChanger = document.getElementById('color-changer');
const secretButton = document.getElementById('secret-button');
const buttonFeedback = document.getElementById('button-feedback');
const hoverBoxes = document.querySelectorAll('.hover-box');
const galleryImages = document.querySelectorAll('.gallery-img');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const accordionBtns = document.querySelectorAll('.accordion-btn');
const keypressBox = document.getElementById('keypress-box');
const keypressDisplay = document.getElementById('keypress-display');
const validationForm = document.getElementById('validation-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const passwordStrength = document.getElementById('password-strength');

// Button Click Events
clickButton.addEventListener('click', () => {
    buttonFeedback.textContent = 'Button was clicked!';
    buttonFeedback.style.backgroundColor = '#d4edda';
    buttonFeedback.style.color = '#155724';
    
    // Reset after 2 seconds
    setTimeout(() => {
        buttonFeedback.textContent = 'Button interactions will appear here';
        buttonFeedback.style.backgroundColor = '#f8f9fa';
        buttonFeedback.style.color = '#333';
    }, 2000);
});

// Color Changer Button
const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6'];
let colorIndex = 0;

colorChanger.addEventListener('click', () => {
    colorIndex = (colorIndex + 1) % colors.length;
    colorChanger.style.backgroundColor = colors[colorIndex];
    colorChanger.textContent = `Color ${colorIndex + 1}`;
});

// Secret Button (Double click or long press)
let clickCount = 0;
let clickTimer = null;

secretButton.addEventListener('click', () => {
    clickCount++;
    
    if (clickCount === 1) {
        clickTimer = setTimeout(() => {
            // Single click action
            buttonFeedback.textContent = 'Try double-clicking me or holding me down!';
            clickCount = 0;
        }, 250);
    } else if (clickCount === 2) {
        // Double click action
        clearTimeout(clickTimer);
        secretButton.classList.add('rainbow');
        buttonFeedback.textContent = '🌈 Secret rainbow mode activated! Double-click again to turn off.';
        clickCount = 0;
        
        // Toggle rainbow mode on double click
        const isRainbow = secretButton.classList.contains('rainbow');
        if (isRainbow) {
            secretButton.textContent = 'Rainbow Mode ON';
        }
    }
});

// Long press detection
secretButton.addEventListener('mousedown', () => {
    secretButton.longPressTimer = setTimeout(() => {
        buttonFeedback.textContent = 'You discovered the long press secret! 🎉';
        secretButton.textContent = 'Secret Found!';
        secretButton.style.backgroundColor = '#f39c12';
    }, 1000);
});

secretButton.addEventListener('mouseup', () => {
    clearTimeout(secretButton.longPressTimer);
});

secretButton.addEventListener('mouseleave', () => {
    clearTimeout(secretButton.longPressTimer);
});

// Hover Effects
hoverBoxes.forEach((box, index) => {
    box.addEventListener('mouseenter', () => {
        box.textContent = `Hovering! (Box ${index + 1})`;
    });
    
    box.addEventListener('mouseleave', () => {
        box.textContent = `Hover Me ${index + 1}`;
    });
});

// Image Gallery
let currentImageIndex = 0;

function showImage(index) {
    galleryImages.forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });
}

prevBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    showImage(currentImageIndex);
});

nextBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    showImage(currentImageIndex);
});

// Auto-advance gallery every 3 seconds
setInterval(() => {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    showImage(currentImageIndex);
}, 3000);

// Accordion
accordionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const accordionContent = btn.nextElementSibling;
        const isActive = accordionContent.classList.contains('active');
        
        // Close all accordion items first
        document.querySelectorAll('.accordion-content').forEach(item => {
            item.classList.remove('active');
        });
        
        document.querySelectorAll('.accordion-icon').forEach(icon => {
            icon.textContent = '+';
        });
        
        // Open clicked one if it wasn't active
        if (!isActive) {
            accordionContent.classList.add('active');
            btn.querySelector('.accordion-icon').textContent = '-';
        }
    });
});

// Keypress Detection
document.addEventListener('keydown', (e) => {
    keypressDisplay.textContent = `You pressed: ${e.key} (KeyCode: ${e.keyCode})`;
    
    // Change color based on key type
    if (e.key >= '0' && e.key <= '9') {
        keypressDisplay.style.backgroundColor = '#2ecc71'; // Green for numbers
    } else if ((e.key >= 'a' && e.key <= 'z') || (e.key >= 'A' && e.key <= 'Z')) {
        keypressDisplay.style.backgroundColor = '#3498db'; // Blue for letters
    } else {
        keypressDisplay.style.backgroundColor = '#9b59b6'; // Purple for others
    }
    
    // Clear after 1 second
    setTimeout(() => {
        keypressDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    }, 1000);
});

// Form Validation
function validateName() {
    const name = nameInput.value.trim();
    if (name === '') {
        nameError.textContent = 'Name is required';
        return false;
    } else if (name.length < 2) {
        nameError.textContent = 'Name must be at least 2 characters';
        return false;
    } else {
        nameError.textContent = '';
        return true;
    }
}

function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email === '') {
        emailError.textContent = 'Email is required';
        return false;
    } else if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email';
        return false;
    } else {
        emailError.textContent = '';
        return true;
    }
}

function validatePassword() {
    const password = passwordInput.value;
    const strengthBar = passwordStrength.querySelector('::after');
    
    if (password === '') {
        passwordError.textContent = 'Password is required';
        passwordStrength.style.setProperty('--strength', '0%');
        return false;
    } else if (password.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters';
        passwordStrength.style.setProperty('--strength', '30%');
        passwordStrength.style.setProperty('--strength-color', '#e74c3c');
        return false;
    } else {
        passwordError.textContent = '';
        
        // Calculate password strength
        let strength = 0;
        if (password.length >= 8) strength += 30;
        if (/[A-Z]/.test(password)) strength += 20;
        if (/[0-9]/.test(password)) strength += 20;
        if (/[^A-Za-z0-9]/.test(password)) strength += 30;
        
        // Set strength bar
        passwordStrength.style.setProperty('--strength', `${strength}%`);
        
        // Set color based on strength
        if (strength < 50) {
            passwordStrength.style.setProperty('--strength-color', '#e74c3c');
        } else if (strength < 80) {
            passwordStrength.style.setProperty('--strength-color', '#f39c12');
        } else {
            passwordStrength.style.setProperty('--strength-color', '#2ecc71');
        }
        
        return true;
    }
}

// Real-time validation
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);

// Form submission
validationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    
    if (isNameValid && isEmailValid && isPasswordValid) {
        alert('Form submitted successfully!');
        validationForm.reset();
        passwordStrength.style.setProperty('--strength', '0%');
    } else {
        alert('Please fix the errors in the form');
    }
});

// Initialize password strength bar
passwordStrength.style.setProperty('--strength', '0%');
passwordStrength.style.setProperty('--strength-color', '#e74c3c');