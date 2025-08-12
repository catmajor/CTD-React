import {useState} from 'react'

import './App.css'
import TodoList from './TodoList'
import TodoForm from './TodoForm'
function App() {
  const [todoList, setTodoList] = useState([]);
  function addTodo(title) {
    const newTodo = {
      id: Date.now(),
      title: title
    }
    setTodoList([...todoList, newTodo])
  }
  return(
    <>
      <h1>Todo List</h1>
      <TodoForm onAddTodo = {addTodo}/>
      <TodoList/>
    </>
  );
}

export default App