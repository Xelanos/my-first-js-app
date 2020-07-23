function loadTodosFromStorage() {

    const todosJSON = localStorage.getItem('todos')
    if (todosJSON !== null) {
        return JSON.parse(todosJSON)
    } else return []

}

function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}


function getThingsTodo(todos) {
    return todos.filter(function (todo) {
        return !todo.completed
    })
}

function sortTodo(todos) {
    return todos.sort(function (todo1, todo2) {
        if (todo1.completed && !todo2.completed) return 1
        if (!todo1.completed && todo2.completed) {
            return -1
        } else return 0
    })
}

function removeTodo(todos, text) {
    let index = todos.findIndex(function (task) {
        return task.text === text
    })
    if (index > -1) todo.splice(index, 1)
}


function renderTodos(todos, filters) {
    let filterd = todos.filter(function (todo) {
        const textMatcher = todo.text.toLowerCase().includes(filters.filterText.toLowerCase())
        const completedMatcher = !filters.hideCompleted || !todo.completed
        return textMatcher && completedMatcher
    })
    document.querySelector("#todos").innerHTML = ''
    document.querySelector("#todos").appendChild(generateSummaryDom(filterd))
    filterd.forEach(function (todo) {
        document.querySelector("#todos").appendChild(generateTodoDom(todo))
    })
}

function generateTodoDom(todo) {
    const todoEle = document.createElement("p")
    todoEle.className = 'todo'
    todoEle.textContent = todo.text
    return todoEle
}

function generateSummaryDom(todos) {
    const todoLeft = todos.filter(function (todo) {
        return !todo.completed
    })
    const todosLeftText = document.createElement("h3")
    todosLeftText.textContent = `You have ${todoLeft.length} thing to do`
    return todosLeftText
}

