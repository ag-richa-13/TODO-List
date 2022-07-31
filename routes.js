const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const path = require("path");

const sourceFolder = path.join(__dirname, "./public");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Root@1234",
  database: "todo",
});

router.get("/", function (req, res) {
  res.sendFile(sourceFolder + "/todo.html");
});

router.get("/get_todos", function (req, res) {
  const queryString = "SELECT * FROM todos WHERE complete = '0'";
  pool.query(queryString, function (err, rows, fields) {
    if (err) {
      console.log("failed to query @ /get_todo: " + err);
    }
    console.log("Getting data from database @ /get_todos");
    res.json(rows);
  });
});

router.post("/complete_todo/:id", function(req, res) {
  const todos_id = req.params.id;
  const queryString = "UPDATE todos SET complete = '1' WHERE todos_id = ?";
  pool.query(queryString, [todos_id], function(err, rows, fields){
    if (err) {
      console.log("Failed to query at /complete_todo/: " + todos_id + " " + err);
    }
    console.log("@/complete_todo/ Completing todo with id " + todos_id);
    res.redirect("/");
  });
});

router.post("/add_todo", function (req, res) {
  const todo = req.body.add_todo_input;
  const queryString = "INSERT INTO todos (todo) VALUES (?)";
  pool.query(queryString, [todo], function (err, rows, fields) {
    if (err) {
      console.log("failed to insert @ /add_todo: " + todo + " " + err);
    }
    console.log("@/add_todo: " + todo + " added.");
    res.redirect("/");
  });
});

module.exports = router;
