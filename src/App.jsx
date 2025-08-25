import {useState} from 'react'

import './App.css'
import TodoList from './features/TodoList/TodoList'
import TodoForm from './features/TodoForm'
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
    setTodoList(updatedTodo);
  }
  function updateTodo(editedTodo) {
    const updatedTodo = todoList.map(ele => {
      if (ele.id === editedTodo.id) return {...editedTodo}
      return ele
    });
    setTodoList(updatedTodo);
  }
  return(
    <>
      <h1>Todo List</h1>
      <TodoForm onAddTodo = {addTodo}/>
      <TodoList todoList = {todoList} onCompleteTodo = {completeTodo} onUpdateTodo = {updateTodo}/>
    </>
  );
}

export default App