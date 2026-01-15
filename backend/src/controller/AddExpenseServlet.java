package controller;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import java.io.IOException;
import java.sql.Date;

import dao.ExpenseDAO;
import model.Expense;
import model.User;

public class AddExpenseServlet extends HttpServlet {

    protected void doPost(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {

        HttpSession session = req.getSession(false);
        if (session == null || session.getAttribute("user") == null) {
            res.sendRedirect("login.html");
            return;
        }

        User user = (User) session.getAttribute("user");

        Expense e = new Expense();
        e.setUserId(user.getId());
        e.setAmount(Double.parseDouble(req.getParameter("amount")));
        e.setCategory(req.getParameter("category"));
        e.setExpenseDate(Date.valueOf(req.getParameter("expense_date")));
        e.setNote(req.getParameter("note"));

        ExpenseDAO dao = new ExpenseDAO();
        if (dao.addExpense(e)) {
            res.sendRedirect("dashboard.html");
        } else {
            res.getWriter().print("Failed to add expense");
        }
    }
}
