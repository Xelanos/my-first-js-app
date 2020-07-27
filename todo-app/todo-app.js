let todos = loadTodosFromStorage()

let filters = {
    filterText: '',
    hideCompleted: false
}

renderTodos(todos, filters)

window.addEventListener('storage', function (e) {
    if (e.key === 'todos'){
        todos = loadTodosFromStorage()
        renderTodos(todos, filters)
    }
})

document.querySelector("#search-text").addEventListener('input', function (e) {
    filters.filterText = e.target.value
    renderTodos(todos, filters)
})

document.querySelector("#todo-form").addEventListener('submit', function (e) {
    e.preventDefault()
    const now = new moment()
    todos.push({
        id: uuidv4(),
        text: e.target.elements.taskText.value,
        completed: false,
        created : now.valueOf(),
        updated : now.valueOf()
    })
    saveTodos(todos)
    renderTodos(todos, filters)
    e.target.elements.taskText.value = ''
})

document.querySelector("#hide-complete").addEventListener('change', function (e) {
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})

