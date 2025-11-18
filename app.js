// Get elements
const todoForm = document.getElementById('todo-form')
const todoInput = document.getElementById('todo-input')
const todoList = document.getElementById('todo-list')

// Load todos from localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || []

// Render todos
function renderTodos() {
  todoList.innerHTML = ''
  todos.forEach((todo, index) => {
    const li = document.createElement('li')
    li.textContent = todo.text
    li.className = todo.completed ? 'completed' : ''

    // Complete toggle
    li.addEventListener('click', () => {
      todos[index].completed = !todos[index].completed
      saveTodos()
      renderTodos()
    })

    // Delete button
    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Delete'
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      todos.splice(index, 1)
      saveTodos()
      renderTodos()
    })

    li.appendChild(deleteBtn)
    todoList.appendChild(li)
  })
}

// Save todos to localStorage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos))
}

// Add new todo
todoForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const newTodo = {
    text: todoInput.value,
    completed: false
  }
  todos.push(newTodo)
  todoInput.value = ''
  saveTodos()
  renderTodos()
})

// Initial render
renderTodos()