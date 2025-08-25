import {useState} from 'react'

import './App.css'
import TodoList from './TodoList'
import TodoForm from './TodoForm'
function App() {
  const [todoList, setTodoList] = useState([]);
  function addTodo(title) {
    const newTodo = {
      id: Date.now(),
      title: title,
      isCompleted: false
    }
    setTodoList([...todoList, newTodo])
  }
  function completeTodo(id) {
    const updatedTodo = todoList.map(ele => {
      if (ele.id === id) return {...ele, isCompleted: true}
      return ele
    });
  }
  return(
    <>
      <h1>Todo List</h1>
      <TodoForm onAddTodo = {addTodo}/>
      <TodoList todoList = {todoList}/>
    </>
  );
}

export default App