const express = require("express");
const { get } = require("mongoose");
const Todo = require("./schema/todoSchema");
const connectDB = require("./database/Config");
const cors = require("cors");
connectDB();

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Server is running...");
});
// CREATE, READ, UPDATE, DELETE (CRUD) operations for Todo
app.post("/todos", async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }
  const newTodo = await Todo.create({ title });
  res.status(201).json(newTodo);
});

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }
  const updatedTodo = await Todo.findByIdAndUpdate(id, { title });
  if (!updatedTodo) {
    return res.status(404).json({ message: "Todo not found" });
  }
  res.json(updatedTodo);
});
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const deletedTodo = await Todo.findByIdAndDelete(id);
  if (!deletedTodo) {
    return res.status(404).json({ message: "Todo not found" });
  }
  res.json({ message: "Todo deleted successfully" });
});
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
