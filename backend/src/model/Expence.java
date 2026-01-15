package model;

import java.sql.Date;

public class Expense {
    private int id;
    private int userId;
    private double amount;
    private String category;
    private Date expenseDate;
    private String note;

    // getters and setters
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public int getUserId() {
        return userId;
    }
    public void setUserId(int userId) {
        this.userId = userId;
    }
    public double getAmount() {
        return amount;
    }
    public void setAmount(double amount) {
        this.amount = amount;
    }
    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }
    public Date getExpenseDate() {
        return expenseDate;
    }
}
