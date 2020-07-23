const todos = [{
    text: 'Clean',
    completed: false
}, {
    text: 'Cook',
    completed: true
}, {
    text: 'Bake',
    completed: true
}, {
    text: 'Sleep',
    completed: false
}]

filters = {
    filterText: '',
    hideCompleted: false
}


function removeTodo(todos, text) {
    let index = todos.findIndex(function (task) {
        return task.text === text
    })
    if (index > -1) todo.splice(index, 1)
}

function getThingsTodo(todos) {
    return todos.filter(function (todo) {
        return !todo.completed
    })
}

function sortTodo(todos) {
    return todos.sort(function (todo1, todo2) {
        if (todo1.completed & !todo2.completed) return 1
        if (!todo1.completed & todo2.completed) {
            return -1
        } else return 0
    })
}

function renderTodos(todos, filters) {

    let filterd = todos.filter(function (todo) {
        return todo.text.toLowerCase().includes(filters.filterText.toLowerCase())
    })

    if (filters.hideCompleted) {
        filterd = filterd.filter(function (todo) {
            return !todo.completed
        })
        console.log(filterd)
    }
    console.log(filterd)

    const todoLeft = filterd.filter(function (todo) {
        return !todo.completed
    })

    document.querySelector("#notes").innerHTML = ''

    const todosLeftText = document.createElement("h3")
    todosLeftText.textContent = `You have ${todoLeft.length} thing to do`
    document.querySelector("#notes").appendChild(todosLeftText)

    filterd.forEach(function (todo) {
        const p = document.createElement("p")
        p.className = 'todo'
        p.textContent = todo.text
        document.querySelector("#notes").appendChild(p)

    })
}

renderTodos(todos, filters)


document.querySelector("#search-text").addEventListener('input', function (e) {
    filters.filterText = e.target.value
    renderTodos(todos, filters)
})

document.querySelector("#todo-form").addEventListener('submit', function (e) {
    e.preventDefault()
    todos.push({
        text: e.target.elements.taskText.value,
        completed: false
    })
    renderTodos(todos, filters)
    e.target.elements.taskText.value = ''
})

document.querySelector("#hide-complete").addEventListener('change', function (e) {
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})