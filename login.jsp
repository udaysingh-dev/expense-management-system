<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login | Expense Tracker</title>
  <link rel="icon" type="image/png" href="WebContent/images/salary.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
  <!-- Add Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="stylesheet" href="WebContent/css/login.css">
</head>
<body>
  <div class="login-wrapper">
    <!-- Background decoration -->
    <div class="login-background">
      <div class="bg-shape bg-shape-1"></div>
      <div class="bg-shape bg-shape-2"></div>
      <div class="bg-shape bg-shape-3"></div>
    </div>

    <!-- Login Container -->
    <div class="login-container">
      <!-- Dark Mode Toggle -->
      <button class="dark-mode-toggle" id="darkModeToggle" aria-label="Toggle dark mode">
        <span class="toggle-icon" id="toggleIcon">
          <i class="fas fa-moon"></i>
        </span>
      </button>

      <!-- Login Card -->
      <div class="login-card">
        <!-- App Logo/Title -->
        <div class="login-header">
          <div class="app-logo">
            <span class="logo-icon">
              <i class="fas fa-wallet"></i>
            </span>
          </div>
          <h1 class="app-title">Expense Tracker</h1>
          <h2 class="login-heading">Welcome Back</h2>
          <p class="login-subtext">Login to continue</p>
        </div>

        <!-- Login Form -->
        <form class="login-form" id="loginForm">
          <!-- Email Field -->
          <div class="form-group">
            <label for="email" class="form-label">Email</label>
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
                placeholder="Enter your password"
                required
                autocomplete="current-password"
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
            <span class="error-message" id="passwordError"></span>
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="form-options">
            <label class="checkbox-label">
              <input type="checkbox" id="rememberMe" name="rememberMe">
              <span class="checkbox-custom">
                <i class="fas fa-check"></i>
              </span>
              <span class="checkbox-text">Remember Me</span>
            </label>
            <a href="#" class="forgot-password" id="forgotPassword">
              <i class="fas fa-key"></i> Forgot Password?
            </a>
          </div>

          <!-- Error Message (General) -->
          <div class="error-message-general" id="generalError" style="display: none;"></div>

          <!-- Login Button -->
          <button type="submit" class="login-button" id="loginButton">
            <span class="button-text">
              <i class="fas fa-sign-in-alt"></i> Login
            </span>
            <span class="button-loader" id="buttonLoader" style="display: none;">
              <span class="loader-spinner">
                <i class="fas fa-spinner fa-spin"></i>
              </span>
            </span>
          </button>
        </form>

        <!-- Divider -->
        <div class="login-divider">
          <span class="divider-line"></span>
          <span class="divider-text">
            <i class="fas fa-minus"></i> or <i class="fas fa-minus"></i>
          </span>
          <span class="divider-line"></span>
        </div>

        <!-- Create Account Link -->
        <div class="login-footer">
          <p class="footer-text">
            Don't have an account?
            <a href="register.jsp" class="register-link">
              <i class="fas fa-user-plus"></i> Create Account
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>

  <script src="WebContent/js/login.js"></script>
</body>
</html>