/*
  Expense Tracker Dashboard
  Frontend implemented by: avantika
  Features: Multi-language, Dark Mode, Analytics Charts
*/
//Translation of languages --->
const translations = {
  en: {
    appTitle: 'Expense Tracker',
    logout: 'Logout',
    dashboard: 'Dashboard',
    reports: 'Reports',
    transactions: 'Transactions',
    settings: 'Settings',
    help: 'Help',
    totalBalance: 'Total Balance',
    totalIncome: 'Total Income',
    totalExpense: 'Total Expense',
    monthlyBudget: 'Monthly Budget',
    addExpense: 'Add Expense',
    addTransaction: 'Add Transaction',
    amount: 'Amount',
    selectType: 'Select Type',
    income: 'Income',
    expense: 'Expense',
    selectCategory: 'Select Category',
    food: 'Food',
    transport: 'Transport',
    travel: 'Travel',
    shopping: 'Shopping',
    entertainment: 'Entertainment',
    bills: 'Bills',
    salary: 'Salary',
    other: 'Other',
    noteOptional: 'Note (optional)',
    transactionHistory: 'Transaction History',
    recentTransactions: 'Recent Transactions',
    viewAll: 'View All',
    date: 'Date',
    type: 'Type',
    category: 'Category',
    note: 'Note',
    darkMode: 'Dark Mode',
    language: 'Language',
    currency: 'Currency',
    darkModeOn: 'On',
    darkModeOff: 'Off',
    noTransactions: 'No transactions yet. Add your first transaction above!',
    fillAllFields: 'Please fill in all required fields',
    addedSuccess: '✓ Added!',
    incomeVsExpense: 'Income vs Expense Overview',
    expenseSummary: 'Expense Summary',
    spendingReport: 'Spending Report',
    topCategories: 'Top Categories',
    monthlyOverview: 'Monthly Overview',
    weekly: 'Weekly',
    monthly: 'Monthly',
    yearly: 'Yearly',
    expenseExceedsIncome: 'Expense cannot exceed income',
    remainingBalance: 'Remaining Balance',
    noIncome: 'No income available. Please add income first.'
  },
  hi: {
    appTitle: 'व्यय ट्रैकर',
    logout: 'लॉगआउट',
    dashboard: 'डैशबोर्ड',
    reports: 'रिपोर्ट',
    transactions: 'लेनदेन',
    settings: 'सेटिंग्स',
    help: 'मदद',
    totalBalance: 'कुल शेष',
    totalIncome: 'कुल आय',
    totalExpense: 'कुल व्यय',
    monthlyBudget: 'मासिक बजट',
    addExpense: 'व्यय जोड़ें',
    addTransaction: 'लेनदेन जोड़ें',
    amount: 'राशि',
    selectType: 'प्रकार चुनें',
    income: 'आय',
    expense: 'व्यय',
    selectCategory: 'श्रेणी चुनें',
    food: 'भोजन',
    transport: 'परिवहन',
    travel: 'यात्रा',
    shopping: 'खरीदारी',
    entertainment: 'मनोरंजन',
    bills: 'बिल',
    salary: 'वेतन',
    other: 'अन्य',
    noteOptional: 'नोट (वैकल्पिक)',
    transactionHistory: 'लेनदेन इतिहास',
    recentTransactions: 'हाल के लेनदेन',
    viewAll: 'सभी देखें',
    date: 'तारीख',
    type: 'प्रकार',
    category: 'श्रेणी',
    note: 'नोट',
    settings: 'सेटिंग्स',
    darkMode: 'डार्क मोड',
    language: 'भाषा',
    currency: 'मुद्रा',
    darkModeOn: 'चालू',
    darkModeOff: 'बंद',
    noTransactions: 'अभी तक कोई लेनदेन नहीं है। अपना पहला लेनदेन ऊपर जोड़ें!',
    fillAllFields: 'कृपया सभी आवश्यक फ़ील्ड भरें',
    addedSuccess: '✓ जोड़ा गया!',
    incomeVsExpense: 'आय बनाम व्यय अवलोकन',
    expenseSummary: 'व्यय सारांश',
    spendingReport: 'खर्च रिपोर्ट',
    topCategories: 'शीर्ष श्रेणियां',
    monthlyOverview: 'मासिक अवलोकन',
    weekly: 'साप्ताहिक',
    monthly: 'मासिक',
    yearly: 'वार्षिक',
    expenseExceedsIncome: 'व्यय आय से अधिक नहीं हो सकता',
    remainingBalance: 'शेष शेष',
    noIncome: 'कोई आय उपलब्ध नहीं है। कृपया पहले आय जोड़ें।'
  },
};
// Chart instances
let overviewChart = null;
let expenseDoughnutChart = null;
let spendingLineChart = null;
let monthlyCharts = {};
// Current language
let currentLanguage = 'en';
// Current spending period
let currentPeriod = 'monthly';
// LANGUAGE FUNCTIONALITY
function changeLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('language', lang);
  document.documentElement.lang = lang;
  // Update all text elements
  updateTranslations();

  // Update form options
  updateFormOptions();
  
  // Update dark mode label
  updateDarkModeLabel();
  
  // Update charts
  updateOverviewChart();
  updateExpenseDoughnutChart();
  updateSpendingLineChart();
  updateTopCategories();
  updateRecentTransactions();
  createMonthlyCharts();
  updateRemainingBalanceDisplay();
}

function updateTranslations() {
  const lang = translations[currentLanguage] || translations.en;
  
  // Update all elements with data-translate attribute
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    if (lang[key]) {
      element.textContent = lang[key];
    }
  });
  
  // Update placeholders
  document.querySelectorAll('[data-placeholder-translate]').forEach(element => {
    const key = element.getAttribute('data-placeholder-translate');
    if (lang[key]) {
      element.placeholder = lang[key];
    }
  });
}

function updateFormOptions() {
  const lang = translations[currentLanguage] || translations.en;
  
  // Update type select options
  const typeSelect = document.getElementById('type');
  if (typeSelect) {
    Array.from(typeSelect.options).forEach(option => {
      if (option.value === 'income' && lang.income) {
        option.textContent = lang.income;
      } else if (option.value === 'expense' && lang.expense) {
        option.textContent = lang.expense;
      } else if (option.value === '' && lang.selectType) {
        option.textContent = lang.selectType;
      }
    });
  }
  
  // Update category select options
  const categorySelect = document.getElementById('category');
  if (categorySelect) {
    Array.from(categorySelect.options).forEach(option => {
      const value = option.value.toLowerCase();
      if (lang[value]) {
        option.textContent = lang[value];
      }
    });
  }
}

function updateDarkModeLabel() {
  const lang = translations[currentLanguage] || translations.en;
  const darkModeToggle = document.getElementById('darkModeToggle');
  const darkModeLabel = document.getElementById('darkModeLabel');
  
  if (darkModeToggle && darkModeLabel) {
    darkModeLabel.textContent = darkModeToggle.checked ? lang.darkModeOn : lang.darkModeOff;
  }
}

function initializeLanguage() {
  const savedLanguage = localStorage.getItem('language') || 'en';
  currentLanguage = savedLanguage;
  document.documentElement.lang = savedLanguage;
  
  const languageSelect = document.getElementById('languageSelect');
  if (languageSelect) {
    languageSelect.value = savedLanguage;
    
    languageSelect.addEventListener('change', function() {
      changeLanguage(this.value);
    });
  }
  
  updateTranslations();
  updateFormOptions();
}
// CHART FUNCTIONALITY
function getChartColors() {
  const isDark = document.body.classList.contains('dark');
  return {
    textColor: isDark ? '#F1F5F9' : '#0F172A',
    gridColor: isDark ? '#334155' : '#E2E8F0',
    incomeColor: '#22C55E',
    expenseColor: '#EF4444',
    backgroundColor: isDark ? '#1E293B' : '#FFFFFF'
  };
}

function initializeOverviewChart() {
  const ctx = document.getElementById('overviewChart');
  if (!ctx) return;
  
  const colors = getChartColors();
  const lang = translations[currentLanguage] || translations.en;
  
  overviewChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: [lang.income, lang.expense],
      datasets: [{
        data: [0, 0],
        backgroundColor: [colors.incomeColor, colors.expenseColor],
        borderWidth: 0,
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: colors.textColor,
            font: {
              size: 14,
              weight: '500'
            },
            padding: 15,
            usePointStyle: true
          }
        },
        tooltip: {
          backgroundColor: colors.backgroundColor,
          titleColor: colors.textColor,
          bodyColor: colors.textColor,
          borderColor: colors.gridColor,
          borderWidth: 1,
          padding: 12,
          displayColors: true,
          callbacks: {
            label: function(context) {
              const currency = localStorage.getItem('currency') || '₹';
              return `${context.label}: ${currency}${context.parsed.toFixed(2)}`;
            }
          }
        }
      },
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 1000,
        easing: 'easeOutQuart'
      }
    }
  });
  
  updateOverviewChart();
}

function updateOverviewChart() {
  if (!overviewChart) return;
  
  const expenses = getExpenses();
  let totalIncome = 0;
  let totalExpense = 0;
  
  expenses.forEach(expense => {
    if (expense.type === 'income') {
      totalIncome += expense.amount;
    } else {
      totalExpense += expense.amount;
    }
  });
  
  overviewChart.data.datasets[0].data = [totalIncome, totalExpense];
  overviewChart.update('active');
}

function createMonthlyCharts() {
  const container = document.getElementById('monthlyChartsContainer');
  if (!container) return;
  
  const expenses = getExpenses();
  const lang = translations[currentLanguage] || translations.en;
  const currency = localStorage.getItem('currency') || '₹';
  
  // Group expenses by month
  const monthlyData = {};
  
  expenses.forEach(expense => {
    const date = new Date(expense.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const monthName = date.toLocaleDateString(currentLanguage === 'hi' ? 'hi-IN' : currentLanguage === 'es' ? 'es-ES' : currentLanguage === 'fr' ? 'fr-FR' : currentLanguage === 'de' ? 'de-DE' : 'en-US', { month: 'long', year: 'numeric' });
    
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        monthName: monthName,
        income: 0,
        expense: 0
      };
    }
    
    if (expense.type === 'income') {
      monthlyData[monthKey].income += expense.amount;
    } else {
      monthlyData[monthKey].expense += expense.amount;
    }
  });
  
  // Clear existing charts
  container.innerHTML = '';
  monthlyCharts = {};
  
  // Sort months chronologically
  const sortedMonths = Object.keys(monthlyData).sort();
  
  if (sortedMonths.length === 0) {
    container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 2rem; width: 100%;">${lang.noTransactions}</div>`;
    return;
  }
  
  sortedMonths.forEach((monthKey, index) => {
    const data = monthlyData[monthKey];
    const cardId = `monthly-chart-${monthKey}`;
    
    const card = document.createElement('div');
    card.className = 'monthly-chart-card';
    card.id = cardId;
    
    card.innerHTML = `
      <div class="monthly-chart-title">${data.monthName}</div>
      <div class="monthly-chart-canvas">
        <canvas id="chart-${monthKey}"></canvas>
      </div>
      <div class="monthly-chart-stats">
        <div class="monthly-stat">
          <div class="monthly-stat-label">${lang.income}</div>
          <div class="monthly-stat-value income">${currency}${data.income.toFixed(2)}</div>
        </div>
        <div class="monthly-stat">
          <div class="monthly-stat-label">${lang.expense}</div>
          <div class="monthly-stat-value expense">${currency}${data.expense.toFixed(2)}</div>
        </div>
      </div>
    `;
    
    container.appendChild(card);
    
    // Create chart
    const canvas = document.getElementById(`chart-${monthKey}`);
    if (canvas) {
      const colors = getChartColors();
      
      monthlyCharts[monthKey] = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: [lang.income, lang.expense],
          datasets: [{
            data: [data.income, data.expense],
            backgroundColor: [colors.incomeColor, colors.expenseColor],
            borderRadius: 8,
            borderSkipped: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: colors.backgroundColor,
              titleColor: colors.textColor,
              bodyColor: colors.textColor,
              borderColor: colors.gridColor,
              borderWidth: 1,
              padding: 10,
              callbacks: {
                label: function(context) {
                  return `${context.label}: ${currency}${context.parsed.y.toFixed(2)}`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: colors.textColor,
                font: {
                  size: 11
                },
                callback: function(value) {
                  return currency + value.toFixed(0);
                }
              },
              grid: {
                color: colors.gridColor,
                drawBorder: false
              }
            },
            x: {
              ticks: {
                color: colors.textColor,
                font: {
                  size: 11,
                  weight: '500'
                }
              },
              grid: {
                display: false
              }
            }
          },
          animation: {
            duration: 800,
            easing: 'easeOutQuart'
          }
        }
      });
    }
  });
}

function calculateRemainingBalance() {
  const expenses = getExpenses();
  let totalIncome = 0;
  let totalExpense = 0;
  
  expenses.forEach(expense => {
    if (expense.type === 'income') {
      totalIncome += expense.amount;
    } else {
      totalExpense += expense.amount;
    }
  });
  
  return totalIncome - totalExpense;
}

function updateRemainingBalanceDisplay() {
  const form = document.getElementById('expenseForm');
  if (!form) return;
  
  // Remove existing balance display
  const existingBalance = form.querySelector('.remaining-balance');
  if (existingBalance) {
    existingBalance.remove();
  }
  
  const remainingBalance = calculateRemainingBalance();
  const currency = localStorage.getItem('currency') || '₹';
  const lang = translations[currentLanguage] || translations.en;
  
  const balanceDiv = document.createElement('div');
  balanceDiv.className = 'remaining-balance';
  
  if (remainingBalance <= 0) {
    balanceDiv.classList.add('zero');
    balanceDiv.textContent = `${lang.remainingBalance}: ${currency}0.00`;
  } else {
    balanceDiv.textContent = `${lang.remainingBalance}: ${currency}${remainingBalance.toFixed(2)}`;
  }
  
  // Insert before submit button
  const submitBtn = form.querySelector('button[type="submit"]');
  if (submitBtn) {
    form.insertBefore(balanceDiv, submitBtn);
  }
}

function updateChartsTheme() {
  const colors = getChartColors();
  const lang = translations[currentLanguage] || translations.en;
  
  // Update overview chart
  if (overviewChart) {
    overviewChart.options.plugins.legend.labels.color = colors.textColor;
    overviewChart.options.plugins.tooltip.backgroundColor = colors.backgroundColor;
    overviewChart.options.plugins.tooltip.titleColor = colors.textColor;
    overviewChart.options.plugins.tooltip.bodyColor = colors.textColor;
    overviewChart.options.plugins.tooltip.borderColor = colors.gridColor;
    overviewChart.update('none');
  }
  
  // Update expense doughnut chart
  if (expenseDoughnutChart) {
    expenseDoughnutChart.options.plugins.tooltip.backgroundColor = colors.backgroundColor;
    expenseDoughnutChart.options.plugins.tooltip.titleColor = colors.textColor;
    expenseDoughnutChart.options.plugins.tooltip.bodyColor = colors.textColor;
    expenseDoughnutChart.options.plugins.tooltip.borderColor = colors.gridColor;
    expenseDoughnutChart.update('none');
  }
  
  // Update spending line chart
  if (spendingLineChart) {
    spendingLineChart.options.plugins.legend.labels.color = colors.textColor;
    spendingLineChart.options.plugins.tooltip.backgroundColor = colors.backgroundColor;
    spendingLineChart.options.plugins.tooltip.titleColor = colors.textColor;
    spendingLineChart.options.plugins.tooltip.bodyColor = colors.textColor;
    spendingLineChart.options.plugins.tooltip.borderColor = colors.gridColor;
    spendingLineChart.options.scales.y.ticks.color = colors.textColor;
    spendingLineChart.options.scales.y.grid.color = colors.gridColor;
    spendingLineChart.options.scales.x.ticks.color = colors.textColor;
    spendingLineChart.update('none');
  }
  
  // Update monthly charts
  Object.keys(monthlyCharts).forEach(monthKey => {
    const chart = monthlyCharts[monthKey];
    if (chart) {
      chart.options.scales.y.ticks.color = colors.textColor;
      chart.options.scales.y.grid.color = colors.gridColor;
      chart.options.scales.x.ticks.color = colors.textColor;
      chart.options.plugins.tooltip.backgroundColor = colors.backgroundColor;
      chart.options.plugins.tooltip.titleColor = colors.textColor;
      chart.options.plugins.tooltip.bodyColor = colors.textColor;
      chart.options.plugins.tooltip.borderColor = colors.gridColor;
      chart.update('none');
    }
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  initializeLanguage();
  initializeDarkMode();
  initializeSettings();
  initializeSidebar();
  initializeModal();
  initializeExpenseForm();
  initializeOverviewChart();
  initializeExpenseDoughnutChart();
  initializeSpendingLineChart();
  initializeTabs();
  initializeProfileDropdown();
  updateSummary();
  updateTopCategories();
  updateRecentTransactions();
  createMonthlyCharts();
  updateRemainingBalanceDisplay();
});

// ============================================
// SIDEBAR FUNCTIONALITY
// ============================================

function initializeSidebar() {
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  const settingsNavItem = document.getElementById('settingsNavItem');
  const navItems = document.querySelectorAll('.nav-item[data-nav]');
  
  // Mobile sidebar toggle
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('active');
    });
  }
  
  // Navigation items click handlers
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const navTarget = this.getAttribute('data-nav');
      
      // Remove active class from all nav items
      navItems.forEach(nav => nav.classList.remove('active'));
      
      // Add active class to clicked item
      this.classList.add('active');
      
      // Handle navigation based on target
      if (navTarget === 'dashboard') {
        scrollToSection('dashboardSection');
      } else if (navTarget === 'reports') {
        scrollToSection('reportsSection');
      } else if (navTarget === 'transactions') {
        scrollToSection('transactionsSection');
      } else if (navTarget === 'settings') {
        const settingsBtn = document.getElementById('settingsBtn');
        if (settingsBtn) {
          settingsBtn.click();
        }
      } else if (navTarget === 'help') {
        // You can add help section or alert
        alert('Help section - Coming soon!');
      }
      
      // Close sidebar on mobile after navigation
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('active');
      }
    });
  });
  
  // Settings navigation
  if (settingsNavItem) {
    settingsNavItem.addEventListener('click', function(e) {
      e.preventDefault();
      const settingsBtn = document.getElementById('settingsBtn');
      if (settingsBtn) {
        settingsBtn.click();
      }
    });
  }
  
  // Close sidebar on mobile when clicking outside
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768 && sidebar.classList.contains('active')) {
      if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
        sidebar.classList.remove('active');
      }
    }
  });
  
  // Update greeting
  updateGreeting();
}

function initializeProfileDropdown() {
  const profileBtn = document.getElementById('profileBtn');
  const profileDropdown = document.getElementById('profileDropdown');
  const logoutBtn = document.getElementById('logoutBtn');
  
  // Toggle dropdown on profile button click
  if (profileBtn && profileDropdown) {
    profileBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      profileDropdown.classList.toggle('active');
    });
  }
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (profileDropdown && !profileDropdown.contains(e.target) && !profileBtn.contains(e.target)) {
      profileDropdown.classList.remove('active');
    }
  });
  
  // Handle logout - redirect to login page
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      // Clear any stored data if needed (optional)
      // localStorage.clear(); // Uncomment if you want to clear all data on logout
      profileDropdown.classList.remove('active');
      // Redirect to login page
      window.location.href = 'login.html';
    });
  }
  
  // Update username from localStorage if available
  const savedUsername = localStorage.getItem('username') || 'User';
  const savedEmail = localStorage.getItem('email') || 'user@example.com';
  
  const usernameEl = document.getElementById('dropdownUsername');
  const emailEl = document.getElementById('dropdownEmail');
  
  if (usernameEl) {
    usernameEl.textContent = savedUsername;
  }
  if (emailEl) {
    emailEl.textContent = savedEmail;
  }
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const headerOffset = 80; // Account for fixed header
    const elementPosition = section.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

function updateGreeting() {
  const greeting = document.getElementById('greeting');
  if (greeting) {
    const hour = new Date().getHours();
    let greetingText = 'Hello, User';
    
    if (hour < 12) {
      greetingText = 'Good Morning, User';
    } else if (hour < 18) {
      greetingText = 'Good Afternoon, User';
    } else {
      greetingText = 'Good Evening, User';
    }
    
    greeting.textContent = greetingText;
  }
}

// ============================================
// MODAL FUNCTIONALITY
// ============================================

function initializeModal() {
  const addExpenseBtn = document.getElementById('addExpenseBtn');
  const addExpenseModal = document.getElementById('addExpenseModal');
  const closeModal = document.getElementById('closeModal');
  
  // Open modal
  if (addExpenseBtn) {
    addExpenseBtn.addEventListener('click', function() {
      addExpenseModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
  
  // Close modal
  if (closeModal) {
    closeModal.addEventListener('click', function() {
      addExpenseModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
  
  // Close on overlay click
  if (addExpenseModal) {
    addExpenseModal.addEventListener('click', function(e) {
      if (e.target === addExpenseModal) {
        addExpenseModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
  
  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && addExpenseModal.classList.contains('active')) {
      addExpenseModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// ============================================
// EXPENSE DOUGHNUT CHART
// ============================================

function initializeExpenseDoughnutChart() {
  const ctx = document.getElementById('expenseDoughnutChart');
  if (!ctx) return;
  
  const colors = getChartColors();
  const categoryColors = {
    'Food': '#FF6384',
    'Transport': '#36A2EB',
    'Travel': '#9B59B6',
    'Shopping': '#FFCE56',
    'Entertainment': '#4BC0C0',
    'Bills': '#9966FF',
    'Salary': '#2ECC71',
    'Other': '#FF9F40'
  };
  
  expenseDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: [],
        borderWidth: 0,
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      cutout: '70%',
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: colors.backgroundColor,
          titleColor: colors.textColor,
          bodyColor: colors.textColor,
          borderColor: colors.gridColor,
          borderWidth: 1,
          padding: 12,
          displayColors: true,
          callbacks: {
            label: function(context) {
              const currency = localStorage.getItem('currency') || '₹';
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((context.parsed / total) * 100).toFixed(1);
              return `${context.label}: ${currency}${context.parsed.toFixed(2)} (${percentage}%)`;
            }
          }
        }
      },
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 1000,
        easing: 'easeOutQuart'
      }
    }
  });
  
  updateExpenseDoughnutChart();
}

function updateExpenseDoughnutChart() {
  if (!expenseDoughnutChart) return;
  
  const expenses = getExpenses();
  const categoryTotals = {};
  const categoryColors = {
    'Food': '#FF6384',
    'Transport': '#36A2EB',
    'Travel': '#9B59B6',
    'Shopping': '#FFCE56',
    'Entertainment': '#4BC0C0',
    'Bills': '#9966FF',
    'Salary': '#2ECC71',
    'Other': '#FF9F40'
  };
  
  // Calculate category totals for expenses only
  expenses.forEach(expense => {
    if (expense.type === 'expense') {
      const category = expense.category || 'Other';
      categoryTotals[category] = (categoryTotals[category] || 0) + expense.amount;
    }
  });
  
  const labels = Object.keys(categoryTotals);
  const data = Object.values(categoryTotals);
  const colors = labels.map(cat => categoryColors[cat] || categoryColors['Other']);
  
  expenseDoughnutChart.data.labels = labels;
  expenseDoughnutChart.data.datasets[0].data = data;
  expenseDoughnutChart.data.datasets[0].backgroundColor = colors;
  expenseDoughnutChart.update('active');
  
  // Update center value
  const total = data.reduce((a, b) => a + b, 0);
  const currency = localStorage.getItem('currency') || '₹';
  const doughnutTotal = document.getElementById('doughnutTotal');
  if (doughnutTotal) {
    doughnutTotal.textContent = `${currency}${total.toFixed(2)}`;
  }
  
  // Update legend
  updateExpenseLegend(labels, data, colors, currency);
}

function updateExpenseLegend(labels, data, colors, currency) {
  const legend = document.getElementById('expenseLegend');
  if (!legend) return;
  
  if (labels.length === 0) {
    legend.innerHTML = '<div style="text-align: center; color: var(--text-muted); padding: 1rem;">No expenses yet</div>';
    return;
  }
  
  const total = data.reduce((a, b) => a + b, 0);
  
  legend.innerHTML = labels.map((label, index) => {
    const value = data[index];
    const percentage = ((value / total) * 100).toFixed(1);
    return `
      <div class="legend-item">
        <span class="legend-color" style="background: ${colors[index]}"></span>
        <span class="legend-label">${label}</span>
        <span class="legend-value">${currency}${value.toFixed(2)} (${percentage}%)</span>
      </div>
    `;
  }).join('');
}

// ============================================
// SPENDING LINE CHART
// ============================================

function initializeSpendingLineChart() {
  const ctx = document.getElementById('spendingLineChart');
  if (!ctx) return;
  
  const colors = getChartColors();
  const lang = translations[currentLanguage] || translations.en;
  
  spendingLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          label: lang.income,
          data: [],
          borderColor: colors.incomeColor,
          backgroundColor: colors.incomeColor + '20',
          tension: 0.4,
          fill: true,
          borderWidth: 3
        },
        {
          label: lang.expense,
          data: [],
          borderColor: colors.expenseColor,
          backgroundColor: colors.expenseColor + '20',
          tension: 0.4,
          fill: true,
          borderWidth: 3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: colors.textColor,
            font: {
              size: 12,
              weight: '500'
            },
            usePointStyle: true,
            padding: 15
          }
        },
        tooltip: {
          backgroundColor: colors.backgroundColor,
          titleColor: colors.textColor,
          bodyColor: colors.textColor,
          borderColor: colors.gridColor,
          borderWidth: 1,
          padding: 12,
          displayColors: true,
          callbacks: {
            label: function(context) {
              const currency = localStorage.getItem('currency') || '₹';
              return `${context.dataset.label}: ${currency}${context.parsed.y.toFixed(2)}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: colors.textColor,
            font: {
              size: 11
            },
            callback: function(value) {
              const currency = localStorage.getItem('currency') || '₹';
              return currency + value.toFixed(0);
            }
          },
          grid: {
            color: colors.gridColor,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: colors.textColor,
            font: {
              size: 11
            }
          },
          grid: {
            display: false
          }
        }
      },
      animation: {
        duration: 800,
        easing: 'easeOutQuart'
      }
    }
  });
  
  updateSpendingLineChart();
}

function updateSpendingLineChart() {
  if (!spendingLineChart) return;
  
  const expenses = getExpenses();
  const lang = translations[currentLanguage] || translations.en;
  const currency = localStorage.getItem('currency') || '₹';
  
  let labels = [];
  let incomeData = [];
  let expenseData = [];
  
  // Group by period
  const now = new Date();
  let periodData = {};
  
  expenses.forEach(expense => {
    const date = new Date(expense.date);
    let key = '';
    
    if (currentPeriod === 'weekly') {
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      key = weekStart.toISOString().split('T')[0];
    } else if (currentPeriod === 'monthly') {
      key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    } else if (currentPeriod === 'yearly') {
      key = String(date.getFullYear());
    }
    
    if (!periodData[key]) {
      periodData[key] = { income: 0, expense: 0 };
    }
    
    if (expense.type === 'income') {
      periodData[key].income += expense.amount;
    } else {
      periodData[key].expense += expense.amount;
    }
  });
  
  // Sort keys and format labels
  const sortedKeys = Object.keys(periodData).sort();
  
  sortedKeys.forEach(key => {
    if (currentPeriod === 'weekly') {
      const date = new Date(key);
      labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    } else if (currentPeriod === 'monthly') {
      const [year, month] = key.split('-');
      labels.push(new Date(year, month - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }));
    } else {
      labels.push(key);
    }
    
    incomeData.push(periodData[key].income);
    expenseData.push(periodData[key].expense);
  });
  
  spendingLineChart.data.labels = labels;
  spendingLineChart.data.datasets[0].data = incomeData;
  spendingLineChart.data.datasets[0].label = lang.income;
  spendingLineChart.data.datasets[1].data = expenseData;
  spendingLineChart.data.datasets[1].label = lang.expense;
  spendingLineChart.update('active');
}

// ============================================
// TABS FUNCTIONALITY
// ============================================

function initializeTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all tabs
      tabBtns.forEach(b => b.classList.remove('active'));
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Update period
      currentPeriod = this.getAttribute('data-period');
      updateSpendingLineChart();
    });
  });
}

// ============================================
// TOP CATEGORIES
// ============================================

function updateTopCategories() {
  const categoriesList = document.getElementById('topCategoriesList');
  if (!categoriesList) return;
  
  const expenses = getExpenses();
  const categoryTotals = {};
  const currency = localStorage.getItem('currency') || '₹';
  
  // Calculate category totals for expenses only
  expenses.forEach(expense => {
    if (expense.type === 'expense') {
      const category = expense.category || 'Other';
      categoryTotals[category] = (categoryTotals[category] || 0) + expense.amount;
    }
  });
  
  // Sort by amount (descending)
  const sortedCategories = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5); // Top 5
  
  if (sortedCategories.length === 0) {
    categoriesList.innerHTML = '<div style="text-align: center; color: var(--text-muted); padding: 2rem;">No expenses yet</div>';
    return;
  }
  
  const maxAmount = sortedCategories[0][1];
  
  categoriesList.innerHTML = sortedCategories.map(([category, amount]) => {
    const percentage = (amount / maxAmount) * 100;
    return `
      <div class="category-item">
        <div class="category-header">
          <span class="category-name">${category}</span>
          <span class="category-amount">${currency}${amount.toFixed(2)}</span>
        </div>
        <div class="category-bar-container">
          <div class="category-bar" style="width: ${percentage}%"></div>
        </div>
      </div>
    `;
  }).join('');
}

// ============================================
// RECENT TRANSACTIONS
// ============================================

function updateRecentTransactions() {
  const transactionsList = document.getElementById('recentTransactionsList');
  if (!transactionsList) return;
  
  const expenses = getExpenses();
  const currency = localStorage.getItem('currency') || '₹';
  const lang = translations[currentLanguage] || translations.en;
  
  // Sort by date (newest first) and take top 5
  const recentExpenses = expenses
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);
  
  if (recentExpenses.length === 0) {
    transactionsList.innerHTML = '<div style="text-align: center; color: var(--text-muted); padding: 2rem;">No transactions yet</div>';
    return;
  }
  
  const categoryIcons = {
    'Food': '🍔',
    'Transport': '🚗',
    'Travel': '✈️',
    'Shopping': '🛍️',
    'Entertainment': '🎬',
    'Bills': '💳',
    'Salary': '💰',
    'Other': '📝'
  };
  
  transactionsList.innerHTML = recentExpenses.map(expense => {
    const icon = categoryIcons[expense.category] || '📝';
    const amountClass = expense.type === 'income' ? 'income' : 'expense';
    const amountSign = expense.type === 'income' ? '+' : '-';
    const amountColor = expense.type === 'income' ? 'var(--success)' : 'var(--danger)';
    
    return `
      <div class="transaction-item">
        <div class="transaction-left">
          <div class="transaction-icon">${icon}</div>
          <div class="transaction-details">
            <div class="transaction-name">${expense.category || 'Other'}</div>
            <div class="transaction-meta">${formatDate(expense.date)}</div>
          </div>
        </div>
        <div class="transaction-amount ${amountClass}">
          ${amountSign}${currency}${Math.abs(expense.amount).toFixed(2)}
        </div>
      </div>
    `;
  }).join('');
}

// ============================================
// DARK MODE FUNCTIONALITY
// ============================================

function initializeDarkMode() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const darkModeLabel = document.getElementById('darkModeLabel');
  
  // Load saved preference
  const savedMode = localStorage.getItem('darkMode');
  const isDarkMode = savedMode === 'true';
  
  if (isDarkMode) {
    document.body.classList.add('dark');
    darkModeToggle.checked = true;
    updateDarkModeLabel();
  } else {
    updateDarkModeLabel();
  }
  
  // Toggle dark mode
  darkModeToggle.addEventListener('change', function() {
    if (this.checked) {
      document.body.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
    updateDarkModeLabel();
    // Update charts theme
    setTimeout(() => {
      updateChartsTheme();
    }, 100);
    // Update all UI components
    updateTopCategories();
    updateRecentTransactions();
  });
}

// ============================================
// SETTINGS MODAL FUNCTIONALITY
// ============================================

function initializeSettings() {
  const settingsBtn = document.getElementById('settingsBtn');
  const settingsOverlay = document.getElementById('settingsOverlay');
  const closeSettings = document.getElementById('closeSettings');
  
  // Open settings
  settingsBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    settingsOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  });
  
  // Close settings
  closeSettings.addEventListener('click', function() {
    settingsOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  });
  
  // Close on overlay click
  settingsOverlay.addEventListener('click', function(e) {
    if (e.target === settingsOverlay) {
      settingsOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && settingsOverlay.classList.contains('active')) {
      settingsOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Initialize currency selector
  const currencySelect = document.getElementById('currencySelect');
  const savedCurrency = localStorage.getItem('currency') || '₹';
  currencySelect.value = savedCurrency;
  
  currencySelect.addEventListener('change', function() {
    localStorage.setItem('currency', this.value);
    updateCurrencyDisplay();
  });
}

// ============================================
// EXPENSE MANAGEMENT
// ============================================

function initializeExpenseForm() {
  const expenseForm = document.getElementById('expenseForm');
  const errorMessage = document.getElementById('errorMessage');
  const submitBtn = document.getElementById('submitBtn');
  const typeSelect = document.getElementById('type');
  
  // Update button state based on income
  function updateSubmitButtonState() {
    const remainingBalance = calculateRemainingBalance();
    const type = typeSelect.value;
    
    if (type === 'expense' && remainingBalance <= 0) {
      submitBtn.disabled = true;
      submitBtn.title = translations[currentLanguage]?.noIncome || 'No income available';
    } else {
      submitBtn.disabled = false;
      submitBtn.title = '';
    }
  }
  
  // Check button state when type changes
  typeSelect.addEventListener('change', function() {
    updateSubmitButtonState();
    hideError();
  });
  
  // Hide error message
  function hideError() {
    if (errorMessage) {
      errorMessage.style.display = 'none';
      errorMessage.textContent = '';
    }
  }
  
  // Show error message
  function showError(message) {
    if (errorMessage) {
      errorMessage.textContent = message;
      errorMessage.style.display = 'block';
      errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
  
  expenseForm.addEventListener('submit', function(e) {
    e.preventDefault();
    hideError();
    
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;
    const note = document.getElementById('note').value || '';
    
    const lang = translations[currentLanguage] || translations.en;
    
    if (!amount || !type || !category || !date) {
      showError(lang.fillAllFields);
      return;
    }
    
    // Validation: Prevent expense exceeding income
    if (type === 'expense') {
      const remainingBalance = calculateRemainingBalance();
      
      if (remainingBalance <= 0) {
        showError(lang.noIncome);
        return;
      }
      
      if (amount > remainingBalance) {
        showError(lang.expenseExceedsIncome);
        return;
      }
    }
    
    // Create expense object
    const transaction = {
      id: Date.now(),
      amount: amount,
      type: type,
      category: category,
      date: date,
      note: note
    };
    
    // Save to localStorage
    const expenses = getExpenses();
    expenses.push(transaction);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    
    // Reset form
    expenseForm.reset();
    hideError();
    
    // Close modal
    const addExpenseModal = document.getElementById('addExpenseModal');
    if (addExpenseModal) {
      addExpenseModal.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    // Update UI
    updateSummary();
    updateOverviewChart();
    updateExpenseDoughnutChart();
    updateSpendingLineChart();
    updateTopCategories();
    updateRecentTransactions();
    createMonthlyCharts();
    updateRemainingBalanceDisplay();
    updateSubmitButtonState();
    
    // Show success feedback
    const originalText = submitBtn.textContent;
    submitBtn.textContent = lang.addedSuccess;
    submitBtn.style.background = '#22C55E';
    
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.style.background = '';
    }, 1500);
  });
  
  // Initial button state check
  updateSubmitButtonState();
  
  // Update button state when expenses change
  const observer = new MutationObserver(() => {
    updateSubmitButtonState();
  });
  
  // Watch for changes in summary (which updates when expenses change)
  const summaryCards = document.querySelector('.summary-cards');
  if (summaryCards) {
    observer.observe(summaryCards, { childList: true, subtree: true });
  }
}

function getExpenses() {
  const expenses = localStorage.getItem('expenses');
  return expenses ? JSON.parse(expenses) : [];
}

function loadExpenses() {
  const expenses = getExpenses();
  const expenseList = document.getElementById('expenseList');
  const currency = localStorage.getItem('currency') || '₹';
  const lang = translations[currentLanguage] || translations.en;
  
  if (expenses.length === 0) {
    expenseList.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 2rem;">${lang.noTransactions}</td></tr>`;
    return;
  }
  
  // Sorting date
  expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  expenseList.innerHTML = expenses.map(expense => {
    const amountClass = expense.type === 'income' ? 'income' : 'expense';
    const amountSign = expense.type === 'income' ? '+' : '-';
    const amountColor = expense.type === 'income' ? 'var(--success)' : 'var(--danger)';
    
  
    const typeText = lang[expense.type] || expense.type;
    const categoryText = lang[expense.category.toLowerCase()] || expense.category;
    
    return `
      <tr>
        <td>${formatDate(expense.date)}</td>
        <td><span style="text-transform: capitalize; font-weight: 500;">${typeText}</span></td>
        <td>${categoryText}</td>
        <td style="color: ${amountColor}; font-weight: 600;">${amountSign}${currency}${Math.abs(expense.amount).toFixed(2)}</td>
        <td>${expense.note || '-'}</td>
      </tr>
    `;
  }).join('');
}

function updateSummary() {
  const expenses = getExpenses();
  const currency = localStorage.getItem('currency') || '₹';
  
  let totalIncome = 0;
  let totalExpense = 0;
  
  expenses.forEach(expense => {
    if (expense.type === 'income') {
      totalIncome += expense.amount;
    } else {
      totalExpense += expense.amount;
    }
  });
  
  const totalBalance = totalIncome - totalExpense;
  
  // Update summary cards
  const totalBalanceEl = document.getElementById('totalBalance');
  const monthlyBudgetEl = document.getElementById('monthlyBudget');
  
  if (totalBalanceEl) {
    totalBalanceEl.textContent = `${currency}${totalBalance.toFixed(2)}`;
  }
  
  // Monthly budget is the total income for the current month
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  let monthlyIncome = 0;
  
  expenses.forEach(expense => {
    if (expense.type === 'income') {
      const date = new Date(expense.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (monthKey === currentMonth) {
        monthlyIncome += expense.amount;
      }
    }
  });
  
  if (monthlyBudgetEl) {
    monthlyBudgetEl.textContent = `${currency}${monthlyIncome.toFixed(2)}`;
  }
}
function updateCurrencyDisplay() {
  updateSummary();
  updateOverviewChart();
  updateExpenseDoughnutChart();
  updateSpendingLineChart();
  updateTopCategories();
  updateRecentTransactions();
  createMonthlyCharts();
  updateRemainingBalanceDisplay();
}
function formatDate(dateString) {
  const date = new Date(dateString);
  const lang = currentLanguage === 'hi' ? 'hi-IN' : currentLanguage === 'es' ? 'es-ES' : currentLanguage === 'fr' ? 'fr-FR' : currentLanguage === 'de' ? 'de-DE' : 'en-US';
  return date.toLocaleDateString(lang, { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}
