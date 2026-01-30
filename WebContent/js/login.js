
// LOGIN PAGE - UI INTERACTIONS
document.addEventListener('DOMContentLoaded', function() {
  initializeDarkMode();
  initializePasswordToggle();
  initializeFormValidation();
  initializeFormSubmit();
});
// DARK MODE FUNCTIONALITY
function initializeDarkMode() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const toggleIcon = document.getElementById('toggleIcon');
  
  // Load saved preference (separate from dashboard)
  const savedMode = localStorage.getItem('loginDarkMode');
  const isDarkMode = savedMode === 'true';
  
  if (isDarkMode) {
    document.body.classList.add('login-dark');
    toggleIcon.textContent = '☀️';
  }
  
  // Toggle dark mode
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
      const isDark = document.body.classList.contains('login-dark');
      
      if (isDark) {
        document.body.classList.remove('login-dark');
        toggleIcon.textContent = '🌙';
        localStorage.setItem('loginDarkMode', 'false');
      } else {
        document.body.classList.add('login-dark');
        toggleIcon.textContent = '☀️';
        localStorage.setItem('loginDarkMode', 'true');
      }
    });
  }
}
// PASSWORD TOGGLE FUNCTIONALITY
function initializePasswordToggle() {
  const passwordToggle = document.getElementById('passwordToggle');
  const passwordInput = document.getElementById('password');
  const toggleEye = document.getElementById('toggleEye');
  
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
}
// FORM VALIDATION (UI ONLY)
function initializeFormValidation() {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  
  // Email validation
  if (emailInput) {
    emailInput.addEventListener('blur', function() {
      validateEmail();
    });
    
    emailInput.addEventListener('input', function() {
      if (this.classList.contains('error')) {
        validateEmail();
      }
    });
  }
  
  // Password validation
  if (passwordInput) {
    passwordInput.addEventListener('blur', function() {
      validatePassword();
    });
    
    passwordInput.addEventListener('input', function() {
      if (this.classList.contains('error')) {
        validatePassword();
      }
    });
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
      return true;
    }
  }
  
  function validatePassword() {
    const password = passwordInput.value;
    
    if (!password) {
      showError(passwordInput, passwordError, 'Password is required');
      return false;
    } else if (password.length < 6) {
      showError(passwordInput, passwordError, 'Password must be at least 6 characters');
      return false;
    } else {
      hideError(passwordInput, passwordError);
      return true;
    }
  }
  
  function showError(input, errorEl, message) {
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
}
// FORM SUBMIT HANDLING (UI ONLY)
function initializeFormSubmit() {
  const loginForm = document.getElementById('loginForm');
  const loginButton = document.getElementById('loginButton');
  const generalError = document.getElementById('generalError');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Hide general error
      if (generalError) {
        generalError.style.display = 'none';
      }
      
      // Validate form
      const emailValid = validateEmail();
      const passwordValid = validatePassword();
      
      if (!emailValid || !passwordValid) {
        showGeneralError('Please fix the errors above');
        return;
      }
      
      // Show loading state
      loginButton.classList.add('loading');
      loginButton.disabled = true;
      loginButton.querySelector('.button-loader').style.display = 'block';
      
      // Simulate login process (UI only - no actual authentication)
      setTimeout(function() {
        // Get form values
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        // Store user info (for demo purposes)
        localStorage.setItem('username', email.split('@')[0] || 'User');
        localStorage.setItem('email', email);
        
        // Redirect to dashboard
        window.location.href = 'dashboard.jsp';
      }, 1500); // Simulate API call delay
    });
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
    } else if (password.length < 6) {
      showError(passwordInput, passwordError, 'Password must be at least 6 characters');
      return false;
    } else {
      hideError(passwordInput, passwordError);
      return true;
    }
  }
  
  function showError(input, errorEl, message) {
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



document.addEventListener('DOMContentLoaded', function() {
  const forgotPasswordLink = document.getElementById('forgotPassword');
  
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', function(e) {
      e.preventDefault();
      alert('Forgot Password feature - Coming soon!\n\nFor now, please use your registered credentials to login.');
    });
  }
});