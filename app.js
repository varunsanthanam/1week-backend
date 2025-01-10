const { log } = require("console");
var express = require("express");
const { connect } = require("http2");
const mongoose = require("mongoose");
const app = express();
const { v4: uuidv4 } = require("uuid"); // import uuid

app.use(express.json()); // this is the middle ware

mongoose.connect("mongodb://localhost:27017/expense").then(() => {
  console.log("database is connected successfully");
});

const expenseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
});

const Expenses = mongoose.model("Expenses", expenseSchema);

app.get("/api/expenses", async (req, res) => {
  try {
    const expenses = await Expenses.find(); //it is a promise
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: "error in finding expenses" });
  }
});

app.get("/api/expenses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expenses.findOne({ id });
    if (!expense) {
      res.status(404).json({ message: "expense not found" });
    }
    res.status(200).json(expense);
  } catch (err) {
    res.status(500).json({ message: "cannot fetch " });
  }
});

app.post("/api/expenses", async (req, res) => {
  console.log(req.body);
  const { id, title, amount } = req.body;
  try {
    const newExpense = new Expenses({
      id: uuidv4(),
      title: title,
      amount: amount,
    });
    const savedExpense = await newExpense.save();
    res.status(200).json(savedExpense);
  } catch (err) {
    res.status(500).json({ message: "Error in creating expense" });
  }
});

app.put("/api/expenses/:id", async (req, res) => {
  const { id } = req.params;
  const { title, amount } = req.body;
  try {
    const updateExpense = await Expenses.findOneAndUpdate(
      { id },
      { title, amount }
    );
    if (!updateExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({ title, amount });
  } catch (err) {
    res.status(500).json({ message: "error in updation" });
  }
});

app.delete("/api/expenses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteExpenses = await Expenses.findOneAndDelete({ id });
    if (!deleteExpenses) {
      res.status(404).json({ message: "record cannot be deleted" });
    }
    res.status(204).json({ message: "message deleted successfully " });
  } catch (err) {
    res.status(500).json({ message: "error in deletion" });
  }
});

// app.get("/api/sayhello", (req, res) => {
//   res.send("Hello CCE");
//   res.end();
// });
// app.get("/api/students", (req, res) => {
//   res.status(200).json([
//     { rollno: 42, name: "prasanth", age: 19 },
//     { rollno: 4, name: "aswin", age: 25 },
//     { rollno: 60, name: "varun", age: 20 },
//   ]);
// });

// app.get("/api/students/:rollno", (req, res) => {
//   const { rollno } = req.params;
//   const student = students.find((s) => s.rollno == rollno);
//   if (!student) {
//     res.status(404).json({ message: "Student not found" });
//   } else {
//     res.status(200).json(student);
//   }
// });

app.listen(3000, () => {
  console.log("The app  is running at http://localhost:3000");
});