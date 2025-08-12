import {useState} from 'react'

import './App.css'
import TodoList from './TodoList'
import TodoForm from './TodoForm'
function App() {
  const [newTodo, setNewTodo] = useState("Example Text");
  return(
    <>
      <h1>Todo List</h1>
      <TodoForm/>
      {newTodo}
      <TodoList/>
    </>
  );
}

export default App