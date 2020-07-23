const todos = loadTodosFromStorage()

let filters = {
    filterText: '',
    hideCompleted: false
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
    saveTodos(todos)
    renderTodos(todos, filters)
    e.target.elements.taskText.value = ''
})

document.querySelector("#hide-complete").addEventListener('change', function (e) {
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})