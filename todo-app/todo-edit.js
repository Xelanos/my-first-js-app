
const todoId = location.hash.substr(1)
const todos = loadTodosFromStorage()
const todo = todos.find(function (todo) {
    return todo.id === todoId
})

console.log(todo)
const now = new moment()
now.add(1, 'year').subtract(20, 'days')
console.log(now.fromNow())
