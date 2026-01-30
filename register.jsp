<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Register | Expense Tracker</title>
  <link rel="icon" type="image/png" href="WebContent/images/salary.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
  <!-- Add Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="stylesheet" href="WebContent/css/register.css">
</head>
<body>
  <div class="register-wrapper">
    <!-- Background decoration -->
    <div class="register-background">
      <div class="bg-shape bg-shape-1"></div>
      <div class="bg-shape bg-shape-2"></div>
      <div class="bg-shape bg-shape-3"></div>
    </div>

    <!-- Register Container -->
    <div class="register-container">
      <!-- Dark Mode Toggle -->
      <button class="dark-mode-toggle" id="darkModeToggle" aria-label="Toggle dark mode">
        <span class="toggle-icon" id="toggleIcon">
          <i class="fas fa-moon"></i>
        </span>
      </button>

      <!-- Register Card -->
      <div class="register-card">
        <!-- App Logo/Title -->
        <div class="register-header">
          <div class="app-logo">
            <span class="logo-icon">
              <i class="fas fa-wallet"></i>
            </span>
          </div>
          <h1 class="app-title">Expense Tracker</h1>
          <h2 class="register-heading">Create Account</h2>
          <p class="register-subtext">Start managing your expenses</p>
        </div>

        <!-- Register Form -->
        <form class="register-form" id="registerForm">
          <!-- Full Name Field -->
          <div class="form-group">
            <label for="fullName" class="form-label">Full Name</label>
            <div class="input-wrapper">
              <span class="input-icon">
                <i class="fas fa-user"></i>
              </span>
              <input 
                type="text" 
                id="fullName" 
                name="fullName" 
                class="form-input" 
                placeholder="Enter your full name"
                required
                autocomplete="name"
              >
            </div>
            <span class="error-message" id="fullNameError"></span>
          </div>

          <!-- Email Field -->
          <div class="form-group">
            <label for="email" class="form-label">Email Address</label>
            <div class="input-wrapper">
              <span class="input-icon">
                <i class="fas fa-envelope"></i>
              </span>
              <input 
                type="email" 
                id="email" 
                name="email" 
                class="form-input" 
                placeholder="Enter your email"
                required
                autocomplete="email"
              >
            </div>
            <span class="error-message" id="emailError"></span>
          </div>

          <!-- Password Field -->
          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <div class="input-wrapper">
              <span class="input-icon">
                <i class="fas fa-lock"></i>
              </span>
              <input 
                type="password" 
                id="password" 
                name="password" 
    class="form-input" 
                placeholder="Create a password"
                required
                autocomplete="new-password"
              >
              <button 
                type="button" 
                class="password-toggle" 
                id="passwordToggle"
                aria-label="Toggle password visibility"
              >
                <span class="toggle-eye" id="toggleEye">
                  <i class="fas fa-eye"></i>
                </span>
              </button>
            </div>
            <!-- Password Strength Indicator -->
            <div class="password-strength" id="passwordStrength">
              <div class="strength-bar">
                <div class="strength-fill" id="strengthFill"></div>
              </div>
              <span class="strength-text" id="strengthText">
                <i class="fas fa-shield-alt"></i> Password strength
              </span>
            </div>
            <span class="error-message" id="passwordError"></span>
          </div>

          <!-- Confirm Password Field -->
          <div class="form-group">
            <label for="confirmPassword" class="form-label">Confirm Password</label>
            <div class="input-wrapper">
              <span class="input-icon">
                <i class="fas fa-lock"></i>
              </span>
              <input 
                type="password" 
                id="confirmPassword" 
                name="confirmPassword" 
                class="form-input" 
                placeholder="Confirm your password"
                required
                autocomplete="new-password"
              >
              <button 
                type="button" 
                class="password-toggle" 
                id="confirmPasswordToggle"
                aria-label="Toggle password visibility"
              >
                <span class="toggle-eye" id="confirmToggleEye">
                  <i class="fas fa-eye"></i>
                </span>
              </button>
            </div>
            <span class="error-message" id="confirmPasswordError"></span>
          </div>

          <!-- Newsletter Opt-in -->
          <div class="form-group">
            <label class="checkbox-label">
              <input type="checkbox" id="newsletter" name="newsletter">
              <span class="checkbox-custom">
                <i class="fas fa-check"></i>
              </span>
              <span class="checkbox-text">
                <i class="fas fa-newspaper"></i> Subscribe to our newsletter
              </span>
            </label>
          </div>

          <!-- Error Message (General) -->
          <div class="error-message-general" id="generalError" style="display: none;"></div>

          <!-- Register Button -->
          <button type="submit" class="register-button" id="registerButton" disabled>
            <span class="button-text">
              <i class="fas fa-user-plus"></i> Create Account
            </span>
            <span class="button-loader" id="buttonLoader" style="display: none;">
              <span class="loader-spinner">
                <i class="fas fa-spinner fa-spin"></i>
              </span>
            </span>
          </button>
        </form>

        <!-- Divider -->
        <div class="register-divider">
          <span class="divider-line"></span>
          <span class="divider-text">
            <i class="fas fa-minus"></i> or <i class="fas fa-minus"></i>
          </span>
          <span class="divider-line"></span>
        </div>

        <!-- Login Link -->
        <div class="register-footer">
          <p class="footer-text">
            Already have an account?
            <a href="login.jsp" class="login-link">
              <i class="fas fa-sign-in-alt"></i> Login
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>

  <script src="WebContent/js/register.js"></script>
</body>
</html>