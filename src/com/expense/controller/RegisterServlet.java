package com.expense.controller;

import java.io.IOException;
import javax.servlet.*;
import javax.servlet.http.*;

import com.expense.dao.UserDAO;
import com.expense.model.User;

public class RegisterServlet extends HttpServlet {
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        User user = new User();
        user.setName(req.getParameter("name"));
        user.setEmail(req.getParameter("email"));
        user.setPassword(req.getParameter("password"));

        UserDAO dao = new UserDAO();
        boolean success = dao.register(user);

        if (success) {
            resp.sendRedirect("login.jsp");
        } else {
            resp.sendRedirect("register.jsp");
        }
    }
}
