import { useState, useRef, useEffect } from 'react';
import './App.css';
import TodoList from './TodoList';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef() // referance to the text input field.

  // grabbing the stored todos from localstorage on page load.
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, []) // empty array means it will happen only once (on load)

  // saving todos in localstorage when todos is changed.
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos]) // todos in array means it will fire whenever todos changes.

  // toggles whether the todo with the given id is done (which in turn sets the checkmark).
  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.done = !todo.done
    setTodos(newTodos)
  }

  function addTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    const id = todos.length>0?todos[todos.length-1].id+1:1
    setTodos(prevTodos => { // when using a function as parameter the previous state is taken in as parameter of the function.
      return [...prevTodos, {id, name, done:false}]
    })
    todoNameRef.current.value = null
  }

  function clearCompletedTodos() {
    const newTodos = todos.filter(todo=>!todo.done)
    setTodos(newTodos)
  }

  return (
    <div style={{position:'absolute', top:'15px', left:'50%', transform:'translate(-50%)', minWidth:'420px'}}>
      <div style={{display:'flex'}}>
        <input type="text" ref={todoNameRef} />
        <button onClick={addTodo}>Add Todo</button>
        <button onClick={clearCompletedTodos}>Clear Completed</button>
        <div style={{marginLeft:'8px', fontSize:'20px'}}>{todos.filter(todo=>!todo.done).length} left</div>
      </div>
      <div style={{display:'flex',flexDirection:'column', gap:'8px', marginTop:'10px'}}>
        <TodoList todos={todos} toggleTodo={toggleTodo}/>
      </div>
    </div>
  )
}

export default App;