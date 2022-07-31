get_todos()

function get_todos() {
  var request = new XMLHttpRequest();
  var requestURL = '/get_todos'
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    var todos = request.response;
    printTodos(todos);
  }
}

function printTodos(todos) {
  var table = document.getElementById("todo_table")

  for (var i in todos) {
    const todos_id = todos[i].todos_id
    const todo = todos[i].todo
    var row = document.createElement("tr")
    var todo_cell = document.createElement("td")
    todo_button = document.createElement("button")
    todo_button.setAttribute("onclick", "completeTodo(" + todos_id + ")")
    todo_button.id = "complete_todo_button"
    todo_button.innerHTML = todo
    todo_cell.append(todo_button)
    row.append(todo_cell)
    table.append(row)
  }
}


function completeTodo(todos_id) {
  var form = document.getElementById("complete_todo_form")
  form.action = form.action + todos_id
  form.submit()
}