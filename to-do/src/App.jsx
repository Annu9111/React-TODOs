import { useState, useEffect } from 'react'
import './App.css'

import { TodoProvider } from './contexts'
import TodoItem from './components/TodoItem'
import TodoForm from './components/TodoForm'

function App() {

  // Get todos from localStorage when the app starts
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos")

    return storedTodos ? JSON.parse(storedTodos) : []
  })

  // Add a new Todo
  const addTodo = (todo) => {
    setTodos((prev) => [
      {
        id: Date.now(),
        ...todo
      },
      ...prev
    ])
  }

  // Update an existing Todo
  const updatedTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, ...todo }
          : prevTodo
      )
    )
  }

  // Delete a Todo
  const deleteTodo = (id) => {
    setTodos((prev) =>
      prev.filter((todo) => todo.id !== id)
    )
  }

  // Toggle Todo completion
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? {
              ...prevTodo,
              completed: !prevTodo.completed
            }
          : prevTodo
      )
    )
  }

  // Save todos to localStorage whenever todos changes
  useEffect(() => {
    localStorage.setItem(
      "todos",
      JSON.stringify(todos)
    )
  }, [todos])


  return (
    <TodoProvider
      value={{
        todos,
        addTodo,
        updatedTodo,
        deleteTodo,
        toggleComplete
      }}
    >

      <div className="bg-[#172842] min-h-screen py-8">

        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">

          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>

          {/* Todo Form */}
          <div className="mb-4">
            <TodoForm />
          </div>

          {/* Todo List */}
          <div className="flex flex-wrap gap-y-3">

            {todos.map((todo) => (
              <div
                key={todo.id}
                className="w-full"
              >
                <TodoItem todo={todo} />
              </div>
            ))}

          </div>

        </div>

      </div>

    </TodoProvider>
  )
}

export default App