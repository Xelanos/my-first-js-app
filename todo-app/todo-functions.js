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

function removeTodo(todoId) {
    let index = todos.findIndex(function (task) {
        return task.id === todoId
    })
    if (index > -1) todos.splice(index, 1)
    saveTodos(todos)
    renderTodos(todos, filters)
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


function updateCompleted(todoId, checked) {
    todos.find(function (todo) {
        return todo.id === todoId
    }).completed = checked
    saveTodos(todos)
    renderTodos(todos, filters)
}

function generateTodoDom(todo) {
    const todoEle = document.createElement("div")
    todoEle.className = 'todo'

    const labelEle = document.createElement("label")
    const todoCheckbox = document.createElement("input")
    const spanText = document.createElement("span")

    todoCheckbox.setAttribute('type', 'checkbox')
    todoCheckbox.checked = todo.completed
    spanText.textContent = todo.text
    labelEle.appendChild(todoCheckbox)
    labelEle.appendChild(spanText)
    todoCheckbox.addEventListener('change', function (e) {
        updateCompleted(todo.id, e.target.checked)
    })
    todoEle.appendChild(labelEle)

    const deleteButton = document.createElement("button")
    deleteButton.textContent = 'x'
    deleteButton.addEventListener('click', function (e) {
        removeTodo(todo.id)
    })
    todoEle.appendChild(deleteButton)

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

