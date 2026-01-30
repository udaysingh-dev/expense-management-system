<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard | Expense Tracker</title>
   <link rel="icon" type="image/png" href="WebContent/images/salary.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="WebContent/css/style.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
</head>
<body>

  <!-- Left Sidebar -->
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-header">
      <h2 class="sidebar-logo" data-translate="appTitle">Expense Tracker</h2>
      <button class="sidebar-toggle-mobile" id="sidebarToggle" aria-label="Toggle sidebar">☰</button>
    </div>
    <nav class="sidebar-nav">
      <a href="#" class="nav-item active" data-nav="dashboard">
        <span class="nav-icon">📊</span>
        <span class="nav-text" data-translate="dashboard">Dashboard</span>
      </a>
      <a href="#" class="nav-item" data-nav="reports">
        <span class="nav-icon">📈</span>
        <span class="nav-text" data-translate="reports">Reports</span>
      </a>
      <a href="#" class="nav-item" data-nav="transactions">
        <span class="nav-icon">💳</span>
        <span class="nav-text" data-translate="transactions">Transactions</span>
      </a>
      <a href="#" class="nav-item" id="settingsNavItem" data-nav="settings">
        <span class="nav-icon">⚙️</span>
        <span class="nav-text" data-translate="settings">Settings</span>
      </a>
      
    </nav>
  </aside>

  <!-- Main Content Area -->
  <div class="main-content">
    <!-- Top Header -->
    <header class="top-header">
      <div class="header-left">
        <h1 class="greeting" id="greeting">Hello, User</h1>
      </div>
      <div class="header-right">
        <button class="header-icon-btn" id="settingsBtn" aria-label="Settings">
          <span>⚙️</span>
        </button>
        <div class="profile-dropdown-container">
          <button class="header-icon-btn profile-btn" id="profileBtn" aria-label="Profile">
            <span class="profile-avatar">U</span>
          </button>
          <div class="profile-dropdown" id="profileDropdown">
            <div class="dropdown-header">
              <div class="dropdown-avatar">A</div>
              <div class="dropdown-user-info">
                <div class="dropdown-username" id="dropdownUsername">Avantika</div>
                <div class="dropdown-email" id="dropdownEmail">user@example.com</div>
              </div>
            </div>
            <div class="dropdown-divider"></div>
            <a href="login.jsp" class="dropdown-item" id="logoutBtn">
              <span class="dropdown-icon">🚪</span>
              <span data-translate="logout">Logout</span>
            </a>
          </div>
        </div>
      </div>
    </header>

    <!-- Dashboard Content -->
    <div class="dashboard-content" id="dashboardSection">
      
      <!-- Top Summary Cards -->
      <div class="summary-cards">
        <div class="summary-card balance-card">
          <div class="summary-card-content">
            <div class="summary-card-header">
              <span class="summary-card-title" data-translate="totalBalance">Total Balance</span>
            </div>
            <div class="summary-card-amount" id="totalBalance">₹0</div>
          </div>
          <div class="summary-card-icon">💰</div>
        </div>
        
        <div class="summary-card budget-card">
          <div class="summary-card-content">
            <div class="summary-card-header">
              <span class="summary-card-title" data-translate="monthlyBudget">Monthly Budget</span>
            </div>
            <div class="summary-card-amount" id="monthlyBudget">₹0</div>
          </div>
          <div class="summary-card-icon">📊</div>
        </div>
        
        <button class="summary-card add-expense-btn" id="addExpenseBtn">
          <span class="add-expense-icon">+</span>
          <span class="add-expense-text" data-translate="addExpense">Add Expense</span>
        </button>
      </div>

      <!-- Two Column Layout -->
      <div class="dashboard-grid">
        <!-- Left Column -->
        <div class="dashboard-left">
          
          <!-- Expense Summary (Doughnut Chart) -->
          <div class="card expense-summary-card">
            <div class="card-header">
              <h3 data-translate="expenseSummary">Expense Summary</h3>
            </div>
            <div class="doughnut-chart-container">
              <canvas id="expenseDoughnutChart"></canvas>
              <div class="doughnut-center">
                <span class="doughnut-label" data-translate="totalExpense">Total Expense</span>
                <span class="doughnut-value" id="doughnutTotal">₹0</span>
              </div>
            </div>
            <div class="chart-legend" id="expenseLegend">
              <!-- Legend will be dynamically added -->
            </div>
          </div>

      <!-- Spending Report (Line Chart with Tabs) -->
      <div class="card spending-report-card" id="reportsSection">
        <div class="card-header">
          <h3 data-translate="spendingReport">Spending Report</h3>
          <div class="chart-tabs">
            <button class="tab-btn active" data-period="weekly" data-translate="weekly">Weekly</button>
            <button class="tab-btn" data-period="monthly" data-translate="monthly">Monthly</button>
            <button class="tab-btn" data-period="yearly" data-translate="yearly">Yearly</button>
          </div>
        </div>
        <div class="chart-container">
          <canvas id="spendingLineChart"></canvas>
        </div>
      </div>

        </div>

        <!-- Right Column -->
        <div class="dashboard-right">
          
          <!-- Top Categories -->
          <div class="card top-categories-card">
            <div class="card-header">
              <h3 data-translate="topCategories">Top Categories</h3>
            </div>
            <div class="categories-list" id="topCategoriesList">
              <!-- Categories will be dynamically added -->
            </div>
          </div>

      <!-- Recent Transactions -->
      <div class="card recent-transactions-card" id="transactionsSection">
        <div class="card-header">
          <h3 data-translate="recentTransactions">Recent Transactions</h3>
          <a href="#" class="view-all-link" data-translate="viewAll">View All</a>
        </div>
        <div class="transactions-list" id="recentTransactionsList">
          <!-- Transactions will be dynamically added -->
        </div>
      </div>

        </div>
      </div>

      <!-- Monthly Scrollable Charts -->
      <div class="card monthly-charts-card">
        <div class="card-header">
          <h3 data-translate="monthlyOverview">Monthly Overview</h3>
        </div>
        <div class="monthly-charts-container" id="monthlyChartsContainer">
          <!-- Monthly charts will be dynamically added here -->
        </div>
      </div>

      <!-- Add Transaction Form (Modal) -->
      <div class="add-expense-modal" id="addExpenseModal">
        <div class="modal-content">
          <div class="modal-header">
            <h3 data-translate="addTransaction">Add Transaction</h3>
            <button class="modal-close" id="closeModal" aria-label="Close">✕</button>
          </div>
          <form id="expenseForm">
            <input type="number" id="amount" data-placeholder-translate="amount" placeholder="Amount" step="0.01" required>
            <select id="type" required>
              <option value="" data-translate="selectType">Select Type</option>
              <option value="income" data-translate="income">Income</option>
              <option value="expense" data-translate="expense">Expense</option>
            </select>
            <select id="category" required>
              <option value="" data-translate="selectCategory">Select Category</option>
              <option value="Food" data-translate="food">Food</option>
              <option value="Rent" data-translate="Rent">Rent</option>
              <option value="Transport" data-translate="transport">Transport</option>
              <option value="Shopping" data-translate="shopping">Shopping</option>
              <option value="Entertainment" data-translate="entertainment">Entertainment</option>
              <option value="Bills" data-translate="bills">Bills</option>
              <option value="Salary" data-translate="salary">Salary</option>
              <option value="Other" data-translate="other">Other</option>
            </select>
            <input type="date" id="date" required>
            <input type="text" id="note" data-placeholder-translate="noteOptional" placeholder="Note (optional)">
            <div id="errorMessage" class="error-message" style="display: none;"></div>
            <button type="submit" data-translate="addTransaction" id="submitBtn">Add Transaction</button>
          </form>
        </div>
      </div>

    </div>
  </div>

  <!-- For setting- -->
  <div class="settings-overlay" id="settingsOverlay">
    <div class="settings-modal">
      <div class="settings-header">
        <h3 data-translate="settings">Settings</h3>
        <button class="close-btn" id="closeSettings" aria-label="Close">✕</button>
      </div>
      
      <div class="settings-item">
        <label data-translate="darkMode">Dark Mode</label>
        <div class="toggle-switch">
          <input type="checkbox" id="darkModeToggle">
          <label for="darkModeToggle"></label>
          <span id="darkModeLabel">Off</span>
        </div>
      </div>
      
      <div class="settings-item">
        <label data-translate="language">Language</label>
        <select id="languageSelect">
          <option value="en">English</option>
          <option value="hi">हिंदी (Hindi)</option>
        </select>
      </div>
      
      <div class="settings-item">
        <label data-translate="currency">Currency</label>
        <select id="currencySelect">
          <option value="₹">₹ (INR)</option>
          <option value="$">$ (USD)</option>
          <option value="€">€ (EUR)</option>
          <option value="£">£ (GBP)</option>
        </select>
      </div>
    </div>
  </div>

  <script src="WebContent/js/dashboard.js"></script>
</body>
</html>

  <!-- Settings Modal -->
  <div class="settings-overlay" id="settingsOverlay">
    <div class="settings-modal">
      <div class="settings-header">
        <h3 data-translate="settings">Settings</h3>
        <button class="close-btn" id="closeSettings" aria-label="Close">✕</button>
      </div>
      
      <div class="settings-item">
        <label data-translate="darkMode">Dark Mode</label>
        <div class="toggle-switch">
          <input type="checkbox" id="darkModeToggle">
          <label for="darkModeToggle"></label>
          <span id="darkModeLabel">Off</span>
        </div>
      </div>
      
      <div class="settings-item">
        <label data-translate="language">Language</label>
        <select id="languageSelect">
          <option value="en">English</option>
          <option value="es">Español (Spanish)</option>
          <option value="hi">हिंदी (Hindi)</option>
          <option value="fr">Français (French)</option>
          <option value="de">Deutsch (German)</option>
        </select>
      </div>
      
      <div class="settings-item">
        <label data-translate="currency">Currency</label>
        <select id="currencySelect">
          <option value="₹">₹ (INR)</option>
          <option value="$">$ (USD)</option>
          <option value="€">€ (EUR)</option>
          <option value="£">£ (GBP)</option>
        </select>
      </div>
    </div>
  </div>

  <script src="WebContent/js/dashboard.js"></script>
</body>
</html>