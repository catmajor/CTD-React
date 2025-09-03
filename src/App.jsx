import {useState} from 'react'

import './App.css'
import TodoList from './features/TodoList/TodoList'
import TodoForm from './features/TodoForm'
function App() {
  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`
  const token = `Bearer ${import.meta.env.VITE_PAT}`
  const [todoList, setTodoList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true)
      const options = {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      }
      try {
        const resp = await fetch(url, options);
        if (!resp.ok) {
          throw new Error(resp.statusText);
        }
        const data = await resp.json();
        const fetchedExamples = data.records.map((record) => {
          const todo = {
            id: record.id,
            ...record.fields,
          };
          if (!todo.isCompleted) {
            todo.isCompleted = false;
          }
          return todo;
        });
        setTodoList([...fetchedExamples]);
      } catch (error) {
        setErrorMessage(error.message);
        console.error('error:', error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, [])
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
      <TodoForm onAddTodo={addTodo}/>
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} onUpdateTodo={updateTodo}/>
    </>
  );
}

export default App