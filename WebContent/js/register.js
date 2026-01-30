// ============================================
// REGISTER PAGE - UI INTERACTIONS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  initializeDarkMode();
  initializePasswordToggles();
  initializePasswordStrength();
  initializeFormValidation();
  initializeFormSubmit();
  initializeFormState();
});

// ============================================
// DARK MODE FUNCTIONALITY
// ============================================

function initializeDarkMode() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const toggleIcon = document.getElementById('toggleIcon');
  
  // Load saved preference (separate from dashboard and login)
  const savedMode = localStorage.getItem('registerDarkMode');
  const isDarkMode = savedMode === 'true';
  
  if (isDarkMode) {
    document.body.classList.add('register-dark');
    toggleIcon.textContent = '☀️';
  }
  
  // Toggle dark mode
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
      const isDark = document.body.classList.contains('register-dark');
      
      if (isDark) {
        document.body.classList.remove('register-dark');
        toggleIcon.textContent = '🌙';
        localStorage.setItem('registerDarkMode', 'false');
      } else {
        document.body.classList.add('register-dark');
        toggleIcon.textContent = '☀️';
        localStorage.setItem('registerDarkMode', 'true');
      }
    });
  }
}

// ============================================
// PASSWORD TOGGLE FUNCTIONALITY
// ============================================

function initializePasswordToggles() {
  const passwordToggle = document.getElementById('passwordToggle');
  const passwordInput = document.getElementById('password');
  const toggleEye = document.getElementById('toggleEye');
  
  const confirmPasswordToggle = document.getElementById('confirmPasswordToggle');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const confirmToggleEye = document.getElementById('confirmToggleEye');
  
  // Password toggle
  if (passwordToggle && passwordInput) {
    passwordToggle.addEventListener('click', function() {
      const isPassword = passwordInput.type === 'password';
      
      if (isPassword) {
        passwordInput.type = 'text';
        toggleEye.textContent = '🙈';
        toggleEye.setAttribute('aria-label', 'Hide password');
      } else {
        passwordInput.type = 'password';
        toggleEye.textContent = '👁️';
        toggleEye.setAttribute('aria-label', 'Show password');
      }
    });
  }
  
  // Confirm password toggle
  if (confirmPasswordToggle && confirmPasswordInput) {
    confirmPasswordToggle.addEventListener('click', function() {
      const isPassword = confirmPasswordInput.type === 'password';
      
      if (isPassword) {
        confirmPasswordInput.type = 'text';
        confirmToggleEye.textContent = '🙈';
        confirmToggleEye.setAttribute('aria-label', 'Hide password');
      } else {
        confirmPasswordInput.type = 'password';
        confirmToggleEye.textContent = '👁️';
        confirmToggleEye.setAttribute('aria-label', 'Show password');
      }
    });
  }
}

// ============================================
// PASSWORD STRENGTH INDICATOR
// ============================================

function initializePasswordStrength() {
  const passwordInput = document.getElementById('password');
  const strengthIndicator = document.getElementById('passwordStrength');
  const strengthFill = document.getElementById('strengthFill');
  const strengthText = document.getElementById('strengthText');
  
  if (passwordInput && strengthIndicator && strengthFill && strengthText) {
    passwordInput.addEventListener('input', function() {
      const password = this.value;
      
      if (password.length === 0) {
        strengthIndicator.classList.remove('show');
        return;
      }
      
      strengthIndicator.classList.add('show');
      const strength = calculatePasswordStrength(password);
      
      // Reset classes
      strengthFill.classList.remove('weak', 'medium', 'strong');
      strengthText.classList.remove('weak', 'medium', 'strong');
      
      // Apply strength classes
      if (strength === 'weak') {
        strengthFill.classList.add('weak');
        strengthText.classList.add('weak');
        strengthText.textContent = 'Weak password';
      } else if (strength === 'medium') {
        strengthFill.classList.add('medium');
        strengthText.classList.add('medium');
        strengthText.textContent = 'Medium strength';
      } else {
        strengthFill.classList.add('strong');
        strengthText.classList.add('strong');
        strengthText.textContent = 'Strong password';
      }
    });
  }
}

function calculatePasswordStrength(password) {
  let strength = 0;
  
  // Length check
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  
  // Character variety checks
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;
  
  if (strength <= 2) return 'weak';
  if (strength <= 4) return 'medium';
  return 'strong';
}

// ============================================
// FORM VALIDATION (UI ONLY)
// ============================================

function initializeFormValidation() {
  const fullNameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  
  const fullNameError = document.getElementById('fullNameError');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const confirmPasswordError = document.getElementById('confirmPasswordError');
  
  // Full Name validation
  if (fullNameInput) {
    fullNameInput.addEventListener('blur', validateFullName);
    fullNameInput.addEventListener('input', function() {
      if (this.classList.contains('error')) {
        validateFullName();
      }
    });
  }
  
  // Email validation
  if (emailInput) {
    emailInput.addEventListener('blur', validateEmail);
    emailInput.addEventListener('input', function() {
      if (this.classList.contains('error')) {
        validateEmail();
      }
    });
  }
  
  // Password validation
  if (passwordInput) {
    passwordInput.addEventListener('blur', validatePassword);
    passwordInput.addEventListener('input', function() {
      if (this.classList.contains('error')) {
        validatePassword();
      }
      // Also validate confirm password if it has value
      if (confirmPasswordInput.value) {
        validateConfirmPassword();
      }
    });
  }
  
  // Confirm Password validation
  if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener('blur', validateConfirmPassword);
    confirmPasswordInput.addEventListener('input', function() {
      if (this.classList.contains('error')) {
        validateConfirmPassword();
      }
    });
  }
  
  function validateFullName() {
    const fullName = fullNameInput.value.trim();
    
    if (!fullName) {
      showError(fullNameInput, fullNameError, 'Full name is required');
      return false;
    } else if (fullName.length < 2) {
      showError(fullNameInput, fullNameError, 'Name must be at least 2 characters');
      return false;
    } else {
      hideError(fullNameInput, fullNameError);
      fullNameInput.classList.add('success');
      return true;
    }
  }
  
  function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
      showError(emailInput, emailError, 'Email is required');
      return false;
    } else if (!emailRegex.test(email)) {
      showError(emailInput, emailError, 'Please enter a valid email address');
      return false;
    } else {
      hideError(emailInput, emailError);
      emailInput.classList.add('success');
      return true;
    }
  }
  
  function validatePassword() {
    const password = passwordInput.value;
    
    if (!password) {
      showError(passwordInput, passwordError, 'Password is required');
      return false;
    } else if (password.length < 8) {
      showError(passwordInput, passwordError, 'Password must be at least 8 characters');
      return false;
    } else {
      hideError(passwordInput, passwordError);
      passwordInput.classList.add('success');
      return true;
    }
  }
  
  function validateConfirmPassword() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    if (!confirmPassword) {
      showError(confirmPasswordInput, confirmPasswordError, 'Please confirm your password');
      return false;
    } else if (password !== confirmPassword) {
      showError(confirmPasswordInput, confirmPasswordError, 'Passwords do not match');
      return false;
    } else {
      hideError(confirmPasswordInput, confirmPasswordError);
      confirmPasswordInput.classList.add('success');
      return true;
    }
  }
  
  function showError(input, errorEl, message) {
    if (input) {
      input.classList.remove('success');
      input.classList.add('error');
    }
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('show');
    }
  }
  
  function hideError(input, errorEl) {
    if (input) {
      input.classList.remove('error');
    }
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.remove('show');
    }
  }
}

// ============================================
// FORM STATE MANAGEMENT
// ============================================

function initializeFormState() {
  const registerButton = document.getElementById('registerButton');
  const fullNameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  
  const inputs = [fullNameInput, emailInput, passwordInput, confirmPasswordInput];
  
  inputs.forEach(input => {
    if (input) {
      input.addEventListener('input', checkFormState);
    }
  });
  
  function checkFormState() {
    const allFilled = inputs.every(input => input && input.value.trim().length > 0);
    
    if (registerButton) {
      registerButton.disabled = !allFilled;
    }
  }
}

// ============================================
// FORM SUBMIT HANDLING (UI ONLY)
// ============================================

function initializeFormSubmit() {
  const registerForm = document.getElementById('registerForm');
  const registerButton = document.getElementById('registerButton');
  const generalError = document.getElementById('generalError');
  const fullNameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Hide general error
      if (generalError) {
        generalError.style.display = 'none';
      }
      
      // Validate all fields
      const fullNameValid = validateFullName();
      const emailValid = validateEmail();
      const passwordValid = validatePassword();
      const confirmPasswordValid = validateConfirmPassword();
      
      if (!fullNameValid || !emailValid || !passwordValid || !confirmPasswordValid) {
        showGeneralError('Please fix the errors above');
        return;
      }
      
      // Show loading state
      registerButton.classList.add('loading');
      registerButton.disabled = true;
      registerButton.querySelector('.button-loader').style.display = 'block';
      
      // Simulate registration process (UI only - no actual backend)
      setTimeout(function() {
        // Store user info (for demo purposes)
        const fullName = fullNameInput.value.trim();
        const email = emailInput.value.trim();
        
        localStorage.setItem('username', fullName);
        localStorage.setItem('email', email);
        
        // Redirect to login page
        window.location.href = 'login.html';
      }, 1500); // Simulate API call delay
    });
  }
  
  function validateFullName() {
    const fullName = fullNameInput.value.trim();
    const fullNameError = document.getElementById('fullNameError');
    
    if (!fullName) {
      showError(fullNameInput, fullNameError, 'Full name is required');
      return false;
    } else if (fullName.length < 2) {
      showError(fullNameInput, fullNameError, 'Name must be at least 2 characters');
      return false;
    } else {
      hideError(fullNameInput, fullNameError);
      return true;
    }
  }
  
  function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailError = document.getElementById('emailError');
    
    if (!email) {
      showError(emailInput, emailError, 'Email is required');
      return false;
    } else if (!emailRegex.test(email)) {
      showError(emailInput, emailError, 'Please enter a valid email address');
      return false;
    } else {
      hideError(emailInput, emailError);
      return true;
    }
  }
  
  function validatePassword() {
    const password = passwordInput.value;
    const passwordError = document.getElementById('passwordError');
    
    if (!password) {
      showError(passwordInput, passwordError, 'Password is required');
      return false;
    } else if (password.length < 8) {
      showError(passwordInput, passwordError, 'Password must be at least 8 characters');
      return false;
    } else {
      hideError(passwordInput, passwordError);
      return true;
    }
  }
  
  function validateConfirmPassword() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    
    if (!confirmPassword) {
      showError(confirmPasswordInput, confirmPasswordError, 'Please confirm your password');
      return false;
    } else if (password !== confirmPassword) {
      showError(confirmPasswordInput, confirmPasswordError, 'Passwords do not match');
      return false;
    } else {
      hideError(confirmPasswordInput, confirmPasswordError);
      return true;
    }
  }
  
  function showError(input, errorEl, message) {
    input.classList.remove('success');
    input.classList.add('error');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('show');
    }
  }
  
  function hideError(input, errorEl) {
    input.classList.remove('error');
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.remove('show');
    }
  }
  
  function showGeneralError(message) {
    if (generalError) {
      generalError.textContent = message;
      generalError.style.display = 'block';
    }
  }
}