package com.expense.controller;

import java.io.IOException;
import javax.servlet.*;
import javax.servlet.http.*;

import com.expense.dao.UserDAO;

public class LoginServlet extends HttpServlet {
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        String email = req.getParameter("email");
        String password = req.getParameter("password");

        UserDAO dao = new UserDAO();
        boolean success = dao.login(email, password);

        if (success) {
            HttpSession session = req.getSession();
            session.setAttribute("user", email);
            resp.sendRedirect("dashboard.jsp");
        } else {
            resp.sendRedirect("login.jsp");
        }
    }
}
