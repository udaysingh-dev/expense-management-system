# Expense Management System - AI Coding Agent Guidelines

## Project Overview
Full-stack Java web application for expense tracking built on Apache Tomcat 10.1.52. Uses classic servlet architecture with JSP views, MVC pattern via DAOs, and MySQL database.

## Architecture & Components

### MVC Structure
- **Controllers**: `src/com/expense/controller/` - Servlets handling HTTP requests (RegisterServlet, LoginServlet, AddExpenseServlet)
- **Models**: `src/com/expense/model/` - Plain Java objects (User.java, Expence.java) with getters/setters
- **DAOs**: `src/com/expense/dao/` - Database access layer (UserDAO.java, ExpenseDAO.java) using JDBC
- **Views**: Root-level JSP files (login.jsp, dashboard.jsp, register.jsp)
- **Utilities**: `src/com/expense/util/DBConnection.java` - singleton-pattern connection pool

### Data Flow
1. JSP form → Servlet (doPost) → extract parameters via req.getParameter()
2. Servlet creates model object and calls DAO method
3. DAO executes PreparedStatement via DBConnection.getConnection()
4. Response: redirect (sendRedirect) or error message

### Key Integration Points
- **Database**: MySQL at `jdbc:mysql://localhost:3306/expense_db` with credentials in DBConnection.java
- **Session Management**: HttpSession for user authentication (login.jsp stores "user" attribute)
- **Servlet Routing**: Configured in WebContent/WEB-INF/web.xml (URL patterns map to servlets)

## Code Patterns & Conventions

### Package Structure Issues
⚠️ **Inconsistency**: Model/DAO classes use incorrect package names:
- `model.Expense` instead of `com.expense.model.Expence`
- `dao.ExpenseDAO` instead of `com.expense.dao.ExpenseDAO`
- This causes import conflicts; standardize to `com.expense.*` prefix

### Naming Convention
- Class: `Expence.java` (note misspelling - keep as-is for backward compatibility)
- Properties: camelCase (userId, expenseDate, amount)
- Database tables: snake_case (user_id, expense_date)

### DAO Pattern
- Always use PreparedStatement (never raw SQL) for security
- Return boolean for success/failure (true = success)
- Catch generic Exception but log via e.printStackTrace()
- Each DAO method handles its own connection lifecycle

### Controller Pattern
- Extract all parameters first: `req.getParameter("fieldName")`
- Validate session before processing: `req.getSession(false).getAttribute("user")`
- Use sendRedirect() for navigation, not forward()
- No request body manipulation (direct redirect)

### JSP Views
- Referenced as root-level files: `/login.jsp`, `/dashboard.jsp`
- Styling via WebContent/css/; scripts via WebContent/js/
- Dashboard uses Chart.js library (CDN link in head)
- Dark mode toggle and sidebar navigation implemented client-side

## Database Schema

Tables (inferred from code):
- **users**: id (PK), name, email, password
- **expenses**: id (PK), user_id (FK), amount, category, expense_date, note

## Build & Deployment
- **Server**: Apache Tomcat 10.1.52 deployed at c:\apache-tomcat-10.1.52\webapps\ExpenseManagement
- **Database Driver**: MySQL Connector/J 9.6.0 in WebContent/lib/
- **Build**: Traditional WAR structure (no Maven/Gradle)

## Critical Notes for AI Agents
1. **Credentials Hardcoded**: DB password in DBConnection.java - flag as security issue if requested
2. **No Error Handling**: Exceptions only print stack traces; add proper error pages
3. **No Validation**: Missing input validation and SQL injection prevention beyond PreparedStatements
4. **Session Persistence**: User object stored as email string (inconsistent with AddExpenseServlet expecting User object)
5. **Path Issues**: Relative paths in JSP links may need adjustment depending on deployment context
