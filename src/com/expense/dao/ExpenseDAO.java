package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import model.Expense;
import util.DBConnection;

public class ExpenseDAO {

    public boolean addExpense(Expense e) {
        try {
            Connection con = DBConnection.getConnection();
            PreparedStatement ps = con.prepareStatement(
                "INSERT INTO expenses(user_id, amount, category, expense_date, note) VALUES(?,?,?,?,?)"
            );

            ps.setInt(1, e.getUserId());
            ps.setDouble(2, e.getAmount());
            ps.setString(3, e.getCategory());
            ps.setDate(4, e.getExpenseDate());
            ps.setString(5, e.getNote());

            return ps.executeUpdate() > 0;

        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return false;
    }
}
