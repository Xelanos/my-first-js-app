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
    const filterd = todos.filter(function (todo) {
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })

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

renderTodos(todos, {searchText: ''} )


document.querySelector("#remove-all").addEventListener("click", function (e) {
    document.querySelectorAll(".todo").forEach(function (todo) {
        document.querySelector("#notes").innerHTML = ''
    })
    console.log('Removed all')
})

document.querySelector("#search-text").addEventListener('input', function (e) {
    renderTodos(todos, {searchText: e.target.value})
})

document.querySelector("#todo-form").addEventListener('submit', function (e) {
    e.preventDefault()
    todos.push({
        text: e.target.elements.taskText.value,
        completed: false
    })
    renderTodos(todos, {searchText: ''})
    e.target.elements.taskText.value = ''
})
